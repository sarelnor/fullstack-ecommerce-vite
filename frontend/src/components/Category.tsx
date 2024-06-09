import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product, CategoryComponentProps } from "../types/types";
import ProductList from "./ProductList";
import SortFilterOptions from "./SortFilterOptions";
import Header from "./Header";
import headerBackground from "./headerBackground"; 

const Category: React.FC<CategoryComponentProps> = ({ category, endpoint }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let sortField = "";
      let sortOrder = "";
      if (sortBy === "created_at_desc") {
        sortField = "created_at";
        sortOrder = "desc";
      } else if (sortBy === "created_at_asc") {
        sortField = "created_at";
        sortOrder = "asc";
      } else if (sortBy === "price_asc") {
        sortField = "price";
        sortOrder = "asc";
      } else if (sortBy === "price_desc") {
        sortField = "price";
        sortOrder = "desc";
      }

      try {
        const response = await axios.get(endpoint, {
          params: {
            sortBy: sortField,
            order: sortOrder,
            materials: filter,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, sortBy, filter, endpoint]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formattedCategory =
    category === "All Products" || category === "New Products"
      ? category
      : category.charAt(0).toUpperCase() + category.slice(1) + "s";

  const backgroundImage = headerBackground[category] || "/default-image.jpg";

  return (
    <div>
      <Header backgroundImage={backgroundImage} title={formattedCategory} />
      <div className="px-6 py-8">
        <SortFilterOptions
          sortBy={sortBy}
          setSortBy={setSortBy}
          filter={filter}
          setFilter={setFilter}
        />
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Category;
