import { createSlice } from "@reduxjs/toolkit";
import { IFilter, IProducts } from "../../types";

const initialState: IFilter = {
  category: [],
  brand: [],
  products: [],
  originalProducts: [],
  originalCategory: [],
  originalBrand: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    initilizeProducts: (state, { payload }) => {
      state.products = payload;
      state.originalProducts = payload;
      //setting brandList
      let brandList: string[] = ["All"];
      payload.map((item: IProducts) =>
        brandList.includes(item.brand!) ? "" : brandList.push(item.brand!)
      );
      state.brand = brandList;
      state.originalBrand = brandList;
      //setting categoryList
      let categoryList: string[] = ["All"];
      payload.map((item: IProducts) =>
        categoryList.includes(item.category!)
          ? ""
          : categoryList.push(item.category!)
      );
      state.category = categoryList;
      state.originalCategory = categoryList;
    },

    filterByCategory: (state, { payload }) => {
      const { activeCategory } = payload;
      if (activeCategory === "All") {
        state.brand = state.originalBrand;
        state.products = state.originalProducts;
      } else {
        const temp: string[] = ["All"];
        state.originalProducts.map((product) =>
          product.category === activeCategory && !temp.includes(product.brand!)
            ? temp.push(product.brand!)
            : ""
        );
        state.products = state.originalProducts.filter((product) => product.category === activeCategory)
        state.brand = temp;
      }
    },
    filterByBrand: (state, {payload}) => {
      const {activeBrand, activeCategory} = payload
      if(activeCategory === "All" && activeBrand === "All"){
        state.products = state.originalProducts
      }
      else if(activeCategory === "All"){
        state.products = state.originalProducts.filter((product) => product.brand === activeBrand)
      }
      else{
        state.products = state.originalProducts.filter((product) => product.brand === activeBrand && product.category === activeCategory)
      }
    },
    filterBySearch : (state, {payload}) => {
      const {searchProducts, search} = payload
      const tempProducts = searchProducts.filter(
        (product:any) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.products = tempProducts
    },
    sortProducts : (state, {payload}) => {
      const {sortProducts, sort} = payload;
      let tempProducts = []
      if (sort === "latest") {
        tempProducts = sortProducts;
      }
      if (sort === "lowest-highest") {
        tempProducts = sortProducts.slice().sort((a:any, b:any) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-lowest") {
        tempProducts = sortProducts.slice().sort((a:any, b:any) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = sortProducts.slice().sort((a:any, b:any) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = sortProducts.slice().sort((a:any, b:any) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.products = tempProducts

    },
    clearAllFilters: (state) => {
      state.brand = state.originalBrand;
      state.products = state.originalProducts;
    },
  },
});

export const { filterByCategory, clearAllFilters, filterByBrand, initilizeProducts, sortProducts,filterBySearch } =
  filterSlice.actions;
export default filterSlice.reducer;
