import React from 'react';
import Category from '../components/Category';

const BraceletsPage: React.FC = () => {
  return <Category category="Bracelet" endpoint="/api/products/category/Bracelet" />;
};

export default BraceletsPage;
