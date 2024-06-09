import React from 'react';
import { HeaderProps } from '../types/types';


const Header: React.FC<HeaderProps> = ({ backgroundImage, title }) => {
  return (
    <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
