import React from 'react';
import Category from '../components/Category';

const RingsPage: React.FC = () => {
  return <Category category="Ring" endpoint="/api/products/category/Ring" />;
};

export default RingsPage;
