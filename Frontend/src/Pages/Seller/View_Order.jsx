import React, { useEffect, useState } from "react";
import axios from "axios";

export default function View_Order() {
  const [orders, setOrders] = useState({ results: [] });
  const [loading, setLoading] = useState(true);

  const getAllOrder = async () => {
    try {
      const allOrder = await axios.get(
        "http://localhost:5000/Order/getAllSellerOrder",
        { withCredentials: true }
      );
      const orderData = allOrder.data;
      setOrders(orderData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }
  return (
    <div className="bg-red-200 min-h-screen flex flex-col p-4">
      <div className="container mx-auto p-4">
        {orders.results.length > 0 ? (
          orders.results.map((user) => (
            <div key={user._id} className="mb-8 p-4 rounded shadow-lg bg-red-300">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{user.userDetails.Name}</h2>
                <p>Email: {user.userDetails.email}</p>
                <p>Location: {user.userDetails.location}</p>
                <p>Mobile: {user.userDetails.Mobile}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Orders:</h3>
                <ul>
                  {user.Orders.map((order, index) => (
                    <li key={index} className="p-2 border-b border-gray-200">
                      <p>Order Date: {order.orderDate}</p>
                      <p>Name: {order.name}</p>
                      <p>Price: ${order.Price}</p>
                      <p>Quantity: {order.qty}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
