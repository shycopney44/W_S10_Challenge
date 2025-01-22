import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 1,
    fullName: 'Sigourney Weaver',
    size: 'S',
    toppings: ['2', '3'], // Assuming 2: Green Peppers, 3: Pineapple
  },
  // Add other orders here if needed
];

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    orders: initialOrders,
    status: 'idle',
    error: null
  },
  reducers: {
    addPizzaOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { addPizzaOrder, removeOrder, updateOrder, setStatus, setError } = pizzaSlice.actions;

export default pizzaSlice.reducer;
