import { createSlice } from "@reduxjs/toolkit";

// Define the types for your state
interface Product {
    id: number;
    img: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    color: string;
    price: string;
    quanty: number;
    aosDelay:string;
    workPhotoPaths: [{
      id: string;
      url: string
    }]
}

interface ShoppingState {
    productData: Product[];
    userInfo: any | null;
    orderData: any[];
}

const initialState: ShoppingState = {
    productData: [],
    userInfo: null,
    orderData: [],
}

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exisingProduct = state.productData.find((item: Product) => item.id === action.payload.id);

            if (exisingProduct) {
                exisingProduct.quanty += action.payload.quanty;
            } else {
                state.productData.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find((item: Product) => item.id == action.payload.id);
            existingProduct && existingProduct.quanty++;
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find((item: Product) => item.id == action.payload.id);
            if (existingProduct?.quanty === 1) {
                existingProduct.quanty === 1
            } else {
                existingProduct && existingProduct.quanty--;
            }


        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter((item: Product) => item.id !== action.payload);
        },
        resetCart: (state) => {
            state.productData = [];
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        deleteUser: (state) => {
            state.userInfo = null;
        },
        saveOrder: (state, action) => {
            state.orderData = action.payload
        },
        resetOrder: (state) => {
            state.orderData = []
        },
    }
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    resetCart,
    addUser,
    deleteUser,
    saveOrder,
    resetOrder } = shoppingSlice.actions;


export default shoppingSlice.reducer;
