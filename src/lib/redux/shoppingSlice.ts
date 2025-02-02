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
    aosDelay: string;
    workPhotoPaths: [{
        id: string;
        url: string
    }]
}

interface ShoppingState {
    productData: Product[];
    userInfo: any | null;
    orderData: any[];
    favoriteData: any[],
}

const initialState: ShoppingState = {
    productData: [],
    userInfo: null,
    orderData: [],
    favoriteData: []
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
        deleteOrderProduct: (state: any, action) => {
            state.orderData.order = state.orderData.order.filter((item: Product) => item.id !== action.payload);
        },
        addToFavorite: (state, action) => {
            const existingProduct = state.favoriteData.find(
                (item: any) => item.id === action.payload.id
            );
            if (existingProduct) {
                state.favoriteData = state.favoriteData.filter(
                    (item) => item.id !== action.payload.id
                );
            } else {
                state.favoriteData.push(action.payload);
            }
        },
        deleteFavorite: (state, action)=>{
            state.favoriteData = state.favoriteData.filter(
                (item) => item.id !== action.payload
            );
        },
        resetFavorite: (state) => {
            state.favoriteData = [];
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
    resetOrder,
    deleteOrderProduct,
    addToFavorite,
    deleteFavorite,
    resetFavorite,
} = shoppingSlice.actions;


export default shoppingSlice.reducer;
