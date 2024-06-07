export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  image_url: string;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductProps {
  id: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

export interface CartContextProps {
  cartItems: CartItem[];
  totalCost: number;
  addToCart: (productId: number, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export interface NavbarProps {
  isHome: boolean;
}

export interface CategoryComponentProps {
  category: string;
  endpoint: string;
}

export interface SortFilterOptionsProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export interface SimpleModalProps {
  isOpen: boolean;
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export interface SectionProps {
  title: string;
  content: string;
  link?: string;
  linkText?: string;
  backgroundColor?: string;
}
