import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, cartTotal, fetchCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.post('/orders', { shippingAddress: form });
      await fetchCart(); // refresh cart (now empty)
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container auth-form">
      <h1>Checkout</h1>

      <h2>Order Summary: ₹{cartTotal}</h2>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />

        <label>Address</label>
        <input name="address" value={form.address} onChange={handleChange} required />

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} required />

        <label>Postal Code</label>
        <input name="postalCode" value={form.postalCode} onChange={handleChange} required />

        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
