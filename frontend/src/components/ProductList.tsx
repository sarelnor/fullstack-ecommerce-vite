import React, { useState } from "react";
import { ProductListProps } from "../types/types";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SimpleModal from "./SimpleModal";

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);

  const openModal = (imageUrl: string, alt: string) => {
    setSelectedImage(imageUrl);
    setSelectedAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedAlt(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-lg shadow-md bg-white flex flex-col"
          >
            <div className="relative w-full h-60 mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-contain rounded-lg cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                onClick={() => openModal(product.image_url, product.name)}
              />
            </div>
            <Link to={`/products/${product.id}`}>
              <h2 className="text-xl font-medium font-inter cursor-pointer mt-2 mb-2 hover:text-zinc-500 hover:underline">
                {product.name}
              </h2>
            </Link>
            <p className="mt-2 mb-2">Material: {product.material}</p>
            <p className="text-lg font-bold mt-2 mb-2">${product.price}</p>
            <div className="mt-auto flex justify-center pt-4 pb-4">
              <button
                onClick={() => addToCart(product.id)}
                className="w-2/3 mx-auto mt-2 text-white py-2 rounded font-medium bg-zinc-600 hover:bg-zinc-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && selectedAlt && (
        <SimpleModal
          isOpen={isModalOpen}
          imageUrl={selectedImage}
          alt={selectedAlt}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProductList;
