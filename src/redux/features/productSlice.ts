import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types";

const initialState:IProduct = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    Store_Products : (state, {payload}) => {
        const {products} = payload;
        state.products = products
    }
  },
});

export const {Store_Products} = productSlice.actions;

export default productSlice.reducer;
