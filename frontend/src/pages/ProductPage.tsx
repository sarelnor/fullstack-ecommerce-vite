import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <Product id={id!} />;
};

export default ProductPage;
