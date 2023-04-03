import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import filterReducer from "./features/filterSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        filter:filterReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch