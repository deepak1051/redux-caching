import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export * from './slices/blogSlice';
