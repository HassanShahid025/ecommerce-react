import { createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../../types";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
    cartTotalQuantity : 0,
    cartTotalAmount : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart :(state, {payload}) => {
        const {product} = payload
        const productIndex = state.cartItems.findIndex((item:IProducts) => item.id === product.id)

        if(productIndex >= 0 ){
            // if product already exist in cart so productIndex will be -1

            state.cartItems[productIndex].cartQuantiy += 1
            toast.info(`${product.name} increased by one`, {position:"top-left"})
        }
        else{
            // if product doesnt exist in cart

            const tempProduct = {...product,cartQuantiy:1}
            state.cartItems.push(product)
            toast.success(`${product.name} added to cart`, {position:"top-left"})
        }
        //save cart to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    }
  },
});

export const {add_to_cart} = cartSlice.actions;

export default cartSlice.reducer;
