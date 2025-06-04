
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import productsData from '../../data/products.json';

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

// Transform the JSON data to match our Product interface
const transformedProducts: Product[] = productsData.map((item: any) => ({
  id: item.id.toString(),
  name: item.title,
  description: item.title,
  price: item.price,
  stock: item.quantity,
  category: 'Electronics',
  lowInventory: item.lowInventory,
  image: item.imageUrl,
  title: item.title,
  quantity: item.quantity,
  imageUrl: item.imageUrl,
}));

const initialState: ProductsState = {
  products: transformedProducts,
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
    loadProductsFromData: (state) => {
      state.products = transformedProducts;
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

export const { 
  setProducts, 
  loadProductsFromData, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  toggleLowInventory, 
  setCurrentPage 
} = productsSlice.actions;
export default productsSlice.reducer;
export type { Product };
