import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="container">Loading...</p>;
  if (!order) return <p className="container">Order not found.</p>;

  return (
    <div className="container">
      <h1>Order Confirmed!</h1>
      <p>Order ID: {order._id}</p>
      <p>Status: <strong>{order.status}</strong></p>

      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item._id}>
            {item.name} × {item.quantity} — ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h2>Total: ₹{order.totalAmount}</h2>

      <h2>Shipping To</h2>
      <p>
        {order.shippingAddress.fullName}<br />
        {order.shippingAddress.address}, {order.shippingAddress.city}<br />
        {order.shippingAddress.postalCode}<br />
        Phone: {order.shippingAddress.phone}
      </p>

      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default OrderDetail;
