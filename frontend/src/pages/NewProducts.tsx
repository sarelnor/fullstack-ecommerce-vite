import React from 'react';
import Category from '../components/Category';

const NewProducts: React.FC = () => {
  return <Category category="New Products" endpoint="/api/products/new" />;
};

export default NewProducts;
