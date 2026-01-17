import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from './productService';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.fetchProducts();
      return data.products || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products.'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.items.length > 0 
          ? Math.max(...state.items.map(p => p.id)) + 1 
          : 1,
      };
      state.items.push(newProduct);
      state.total = state.items.length;
    },
    updateProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.items.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      state.total = state.items.length;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.total = action.payload.length;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct, clearError } = productSlice.actions;
export default productSlice.reducer;

