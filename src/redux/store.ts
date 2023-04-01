import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
// import productsRedeucer from "./features/productsSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        // products:productsRedeucer,
        filter:filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch