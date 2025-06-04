
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  lowInventory: boolean;
  imageUrl: string;
}

interface ProductsState {
  products: Product[];
  currentPage: number;
  productsPerPage: number;
  sortBy: 'title' | 'price' | 'quantity';
  sortOrder: 'asc' | 'desc';
  filterMinPrice: number;
  filterMaxPrice: number;
  filterMinQuantity: number;
}

const initialState: ProductsState = {
  products: productsData as Product[],
  currentPage: 1,
  productsPerPage: 5,
  sortBy: 'title',
  sortOrder: 'asc',
  filterMinPrice: 0,
  filterMaxPrice: 25000,
  filterMinQuantity: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newId = Math.max(...state.products.map(p => p.id)) + 1;
      state.products.push({
        ...action.payload,
        id: newId,
      });
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    toggleLowInventory: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.lowInventory = !product.lowInventory;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'price' | 'quantity'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setFilterMinPrice: (state, action: PayloadAction<number>) => {
      state.filterMinPrice = action.payload;
    },
    setFilterMaxPrice: (state, action: PayloadAction<number>) => {
      state.filterMaxPrice = action.payload;
    },
    setFilterMinQuantity: (state, action: PayloadAction<number>) => {
      state.filterMinQuantity = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleLowInventory,
  setCurrentPage,
  setProductsPerPage,
  setSortBy,
  setSortOrder,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterMinQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
