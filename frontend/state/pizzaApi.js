import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getPizzas: builder.query({
      query: () => 'pizza/history',
      providesTags: ['Orders'],
    }),
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'pizza/order',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetPizzasQuery, useAddOrderMutation } = pizzaApi;
