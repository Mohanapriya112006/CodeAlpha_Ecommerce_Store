import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.items.map((item) => (
          <div key={item.product} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>₹{item.price} each</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.product, Number(e.target.value))}
            />
            <p className="cart-item-subtotal">₹{item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.product)} className="btn-remove">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ₹{cartTotal}</h2>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
