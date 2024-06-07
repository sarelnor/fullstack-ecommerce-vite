import React from 'react';
import Category from '../components/Category';

const NecklacesPage: React.FC = () => {
  return <Category category="Necklace" endpoint="/api/products/category/Necklace" />;
};

export default NecklacesPage;
