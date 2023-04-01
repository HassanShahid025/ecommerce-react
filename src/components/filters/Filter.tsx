import { useState } from "react";
import "./filter.scss";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearAllFilters,
  filterByBrand,
  filterByCategory,
} from "../../redux/features/filterSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export const Filters = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const { category, brand } = useSelector((store: RootState) => store.filter);
  const dispatch = useDispatch();

  const handleCategoryClick = (Selectedcategory: any) => {
    setActiveCategory(Selectedcategory);
    dispatch(filterByCategory({ activeCategory: Selectedcategory }));
  };

  const handleBrandChange = (event: any) => {
    setSelectedBrand(event.target.value);
    dispatch(filterByBrand({activeBrand:event.target.value,activeCategory }))
  };

  const clearFilters = () => {
    setActiveCategory("All");
    setSelectedBrand("All");
    dispatch(clearAllFilters());
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <ul className="category-list">
        {category.map((item) => {
          return (
            <li
              className={activeCategory === item ? "active" : ""}
              key={nanoid()}
              onClick={() => handleCategoryClick(item)}
            >
              <AiOutlineRight />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
      <h2>Brand</h2>
      <select
        className="brand-select"
        onChange={handleBrandChange}
        value={selectedBrand}
      >
        {brand.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <button className="clear-button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};
