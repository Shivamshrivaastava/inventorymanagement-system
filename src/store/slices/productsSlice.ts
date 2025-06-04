
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  productsPerPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filterMinPrice: number;
  filterMaxPrice: number;
  filterMinQuantity: number;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  productsPerPage: 9,
  sortBy: 'name',
  sortOrder: 'asc',
  filterMinPrice: 0,
  filterMaxPrice: 100000,
  filterMinQuantity: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    toggleLowInventory: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.lowInventory = !product.lowInventory;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, toggleLowInventory, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
export type { Product };
