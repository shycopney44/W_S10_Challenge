import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import sizeFilterReducer from './sizeFilterSlice';

export const resetStore = () => configureStore({
  reducer: {
    sizeFilter: sizeFilterReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(pizzaApi.middleware),
});

export const store = resetStore();
