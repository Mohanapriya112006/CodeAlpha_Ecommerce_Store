import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 && <p>You haven't placed any orders yet.</p>}

      <div className="orders-list">
        {orders.map((order) => (
          <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
            <p>Order #{order._id.slice(-6)}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
