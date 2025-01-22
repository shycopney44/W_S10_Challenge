import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSizeFilter } from '../state/sizeFilterSlice'; // Adjust the path as needed
import { useGetPizzasQuery } from '../state/pizzaApi';

export default function OrderList() {
  const dispatch = useDispatch();
  const sizeFilter = useSelector(state => state.sizeFilter.size);
  const orders = useGetPizzasQuery().data || [];


  const handleFilterClick = (size) => {
    dispatch(setSizeFilter(size));
  };

  const filteredOrders = sizeFilter === 'All' ? orders : orders.filter(order => order.size === sizeFilter);

  console.log('Filtered orders:', filteredOrders); // Log filtered orders

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <>
          <ol>
            {
              filteredOrders.map((order, index) => (
                <li key={index}>
                  <div>

                    {`${order.customer} ordered a size ${order.size} with ${order.toppings.length} topping${order.toppings.length == 1 ? '' : 's'}`}
                  </div>
                </li>
              ))
            }
          </ol>
        </>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`;
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => handleFilterClick(size)}>
                {size}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}
