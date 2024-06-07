import React from 'react';
import Category from '../components/Category';

const AllProducts: React.FC = () => {
  return <Category category="All Products" endpoint="/api/products" />;
};

export default AllProducts;
