import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSizeFilter } from '../state/sizeFilterSlice';

export default function OrderList() {
  const dispatch = useDispatch();
  const sizeFilter = useSelector(state => state.sizeFilter);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9009/api/pizza/history')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleFilterClick = (size) => {
    dispatch(setSizeFilter(size));
  };

  const filteredOrders = sizeFilter === 'All' ? orders : orders.filter(order => order.size === sizeFilter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order, index) => (
            <li key={index}>
              <div>
                {order.customer} ordered a size {order.size} with {order.toppings.length} toppings
              </div>
            </li>
          ))
        }
      </ol>
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
