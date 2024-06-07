import React from "react";
import { SortFilterOptionsProps } from "../types/types";

const SortFilterOptions: React.FC<SortFilterOptionsProps> = ({
  sortBy,
  setSortBy,
  filter,
  setFilter,
}) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mb-4 mt-4">
      <div className="mb-2">
        <label htmlFor="sortBy" className="mr-3">Sort By: </label>
        <select
          id="sortBy"
          name="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ml-2 p-2 border rounded w-48"
        >
          <option value="">None</option>
          <option value="created_at_desc">Date: New to old</option>
          <option value="created_at_asc">Date: Old to new</option>
          <option value="price_asc">Price: Low to high</option>
          <option value="price_desc">Price: High to low</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="filterBy" className="mr-2">Filter by: </label>
        <select
          id="filterBy"
          name="filterBy"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-2 border rounded w-48"
        >
          <option value="">All</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilterOptions;
