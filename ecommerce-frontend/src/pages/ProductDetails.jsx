import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setMessage('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(product._id, quantity);
      setMessage('Added to cart!');
    } catch (err) {
      setMessage('Could not add to cart. Try again.');
    }
  };

  if (loading) return <p className="container">Loading...</p>;
  if (!product) return <p className="container">Product not found.</p>;

  return (
    <div className="container product-detail">
      <img src={product.image} alt={product.name} className="product-detail-img" />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-category">{product.category}</p>
        <p className="product-detail-price">₹{product.price}</p>
        <p>{product.description}</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

        {product.stock > 0 && (
          <div className="add-to-cart-row">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}

        {message && <p className="info-message">{message}</p>}
      </div>
    </div>
  );
}

export default ProductDetails;
