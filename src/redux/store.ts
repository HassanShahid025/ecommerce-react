import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import productReducer from "./features/productSlice";
import filterReducer from "./features/filterSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        filter:filterReducer,
        cart:cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch