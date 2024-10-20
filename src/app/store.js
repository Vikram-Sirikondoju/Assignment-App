import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

const storedUser = localStorage.getItem('user');
const initialState = {
  auth: {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState, // Set initial state
});

export default store;
