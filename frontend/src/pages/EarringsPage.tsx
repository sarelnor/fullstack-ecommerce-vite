import React from 'react';
import Category from '../components/Category';

const EarringsPage: React.FC = () => {
  return <Category category="Earring" endpoint="/api/products/category/Earring" />;
};

export default EarringsPage;
