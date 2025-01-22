import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaSlice';
import { pizzaApi } from './pizzaApi';
import sizeFilterReducer from './sizeFilterSlice';

export const resetStore = () => configureStore({
  reducer: {
    pizza: pizzaReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    sizeFilter: sizeFilterReducer,
  },
  middleware: (getDefault) => getDefault().concat(pizzaApi.middleware),
});

export const store = resetStore();
