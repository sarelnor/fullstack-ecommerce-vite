import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import { createError, AppError } from './errorUtils';

dotenv.config();

const pool = new Pool({ connectionString: process.env.PGURI });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.session_id) {
    res.cookie('session_id', uuidv4(), { httpOnly: true, sameSite: 'lax' });
  }
  next();
});

app.use(express.static(path.join(path.resolve(), 'dist')))

// Function to handle adding or updating the cart
const addOrUpdateCart = async (sessionId: string, productId: number, quantity: number, res: Response, next: NextFunction) => {
  try {
    await pool.query(
      'INSERT INTO cart (session_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (session_id, product_id) DO UPDATE SET quantity = $3',
      [sessionId, productId, quantity]
    );
    res.send({ message: 'Cart updated' });
  } catch (error) {
    console.error('Error updating cart:', error);
    next(createError('Error updating cart', 500));
  }
};

// Get all products, also possible with sorting and filtering
app.get('/api/products', async (req: Request, res: Response, next: NextFunction) => {
  const sortBy = (req.query.sortBy as string) || 'created_at';
  const order = (req.query.order as string) || 'desc';
  const materials = req.query.materials as string;
  const materialFilter = materials ? materials.split(',') : [];

  let query = 'SELECT * FROM products';
  const queryParams: any[] = [];

  if (materialFilter.length > 0) {
    query += ' WHERE material = ANY($1)';
    queryParams.push(materialFilter);
  }

  query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;

  try {
    const { rows } = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    next(createError('Error fetching products', 500));
  }
});

// Search products by name
app.get('/api/products/search', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    const query = 'SELECT * FROM products WHERE LOWER(name) LIKE $1';
    const queryParams = [`%${(name as string).toLowerCase()}%`];
    const { rows } = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    next(createError('Error searching products', 500));
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params;
  const { sortBy, order, materials } = req.query;
  const materialFilter = materials ? (materials as string).split(',') : [];
  let query = 'SELECT * FROM products WHERE LOWER(category) = LOWER($1)';
  const queryParams: any[] = [category];

  if (materialFilter.length > 0) {
    query += ' AND material = ANY($2)';
    queryParams.push(materialFilter);
  }

  if (sortBy && order) {
    query += ` ORDER BY ${sortBy} ${order}`;
  }

  try {
    const { rows } = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    next(createError('Error fetching products by category', 500));
  }
});

// Get products newly added (last 6 days)
app.get('/api/products/new', async (req: Request, res: Response, next: NextFunction) => {
  const { sortBy, order, materials } = req.query;
  const materialFilter = materials ? (materials as string).split(',') : [];
  let query = `SELECT * FROM products WHERE created_at >= NOW() - INTERVAL '6 days'`;
  const queryParams: any[] = [];

  if (materialFilter.length > 0) {
    query += ' AND material = ANY($1)';
    queryParams.push(materialFilter);
  }

  if (sortBy && order) {
    query += ` ORDER BY ${sortBy} ${order}`;
  }

  try {
    const { rows } = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    next(createError('Error fetching new products', 500));
  }
});

// Get a specific product by ID
app.get('/api/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    next(createError('Error fetching product', 500));
  }
});

// Get cart
app.get('/api/cart', async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.session_id;
  try {
    const { rows } = await pool.query(
      `SELECT c.product_id, c.quantity, p.name, p.price, p.image_url 
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.session_id = $1`,
      [sessionId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    next(createError('Error fetching cart', 500));
  }
});

// Add a product to the user's cart
app.post('/api/cart', async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.session_id;
  const { productId, quantity = 1 } = req.body;

  try {
    await pool.query(
      'INSERT INTO cart (session_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (session_id, product_id) DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity',
      [sessionId, productId, quantity]
    );
    res.send({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error updating cart:', error);
    next(createError('Error updating cart', 500));
  }
});

// Update quantity in cart
app.post('/api/cart/update', async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.session_id;
  const { productId, quantity } = req.body;
  addOrUpdateCart(sessionId, productId, quantity, res, next);
});

// Remove item from cart
app.post('/api/cart/remove', async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.session_id;
  const { productId } = req.body;
  try {
    await pool.query(
      'DELETE FROM cart WHERE session_id = $1 AND product_id = $2',
      [sessionId, productId]
    );
    res.send({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    next(createError('Error removing product from cart', 500));
  }
});

// Route with 404 Not Found Error
app.get('/api/not-found', (req: Request, res: Response, next: NextFunction) => {
  next(createError('Not Found', 404));
});

// Error handling middleware should be placed at the end of all route definitions and middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
