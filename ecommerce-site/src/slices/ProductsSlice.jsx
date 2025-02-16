import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    allProducts: [],
    cart: [],
    loading: false,
    error: null,
};

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products');

        const productsWithQuantity = response.data.map(product => ({
            ...product,
            quantity: 1,
            inCart: false

        }));

        return productsWithQuantity;
    }
);


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const addedProduct = state.products.find((p) => p.id === action.payload.id);
            let addedProductInCart = state.cart.find((c) => (c.id === addedProduct.id))

            if (addedProduct) {
                if (!addedProductInCart) {
                    addedProduct.inCart = true;
                    state.cart.push(action.payload);
                } else { alert("ürün zaten sepette") }
            }
        },
        increaseNumber: (state, action) => {
            const selectedProduct = state.products.find((p) => p.id === action.payload.id);
            const selectedInCart = state.cart.find((p) => p.id === action.payload.id);

            if (selectedProduct) {
                selectedProduct.quantity++;
                selectedInCart.quantity++;
            }

        },
        decreaseNumber: (state, action) => {
            const selectedProduct = state.products.find((c) => c.id === action.payload.id);
            const selectedInCart = state.cart.find((p) => p.id === action.payload.id);

            if (selectedProduct) {
                selectedProduct.quantity--;
                selectedInCart.quantity--;
            }

        },
        removeItem: (state, action) => {
            const removedProduct = state.products.find((p) => p.id === action.payload.id);

            state.cart = state.cart.filter((cartItem) => (cartItem.id !== removedProduct.id))

            if (removedProduct) {
                removedProduct.inCart = false;
                removedProduct.quantity = 1
            }
        }, search: (state, action) => {

            state.products = state.allProducts.filter((p) => (
                p.title.toLowerCase().includes(action.payload.toLowerCase())
            ))
        }, displayAllProducts: (state) => {
            state.products = state.allProducts

        }, categorize: (state, action) => {
            state.products = state.allProducts.filter((p) => (p.category === action.payload))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.map((product) => {
                    const cartItem = state.cart.find((c) => c.id === product.id);
                    return cartItem ? { ...product, inCart: true, quantity: cartItem.quantity } : product;
                });

                state.allProducts = state.products;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addToCart, increaseNumber, decreaseNumber, removeItem, search, displayAllProducts, categorize } = productSlice.actions;


export default productSlice.reducer;