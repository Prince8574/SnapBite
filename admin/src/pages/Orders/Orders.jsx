import React, { useEffect, useState, useRef } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevOrdersRef = useRef([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const newOrders = response.data.data;

        // Check if new orders have been added
        if (newOrders.length > prevOrdersRef.current.length) {
          console.log("New order received!");
        }

        setOrders(newOrders);
        prevOrdersRef.current = newOrders; // Update the previous orders reference
      } else {
        toast.error("Error getting orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated successfully"); // Success popup
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();

    const interval = setInterval(fetchAllOrders, 20000); 

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <div>No orders available.</div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} → {item.quantity}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city + ", " + 
                     order.address.state + ", " + 
                     order.address.country + ", " + 
                     order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivery Successful">Delivery Successful</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
