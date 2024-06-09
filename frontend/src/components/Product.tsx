import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product as ProductType, ProductProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import SimpleModal from "./SimpleModal";
import '../styles/styles.css';

const Product: React.FC<ProductProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="custom-container py-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Go back
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/3 h-96 md:h-[600px] mb-4 md:mb-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-contain rounded-lg cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                onClick={() => openModal(product.image_url, product.name)}
              />
            </div>
            <div className="md:w-1/3 flex flex-col justify-center">
              <h1 className="text-3xl font-semibold font-inter mb-8 text-center md:text-left">
                {product.name}
              </h1>
              <p className="mb-6">
                <strong>Material:</strong> {product.material}
              </p>
              <p className="mb-6">{product.description}</p>
              <p className="text-lg font-bold mb-6">Price: ${product.price}</p>
              <button
                onClick={() => addToCart(product.id)}
                className="w-2/3 mx-auto mt-2 text-white py-2 rounded font-medium bg-zinc-600 hover:bg-zinc-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
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

export default Product;
