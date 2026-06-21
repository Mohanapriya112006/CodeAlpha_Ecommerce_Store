import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-card-img" />
        <h3>{product.name}</h3>
        <p className="product-card-price">₹{product.price}</p>
        <p className="product-card-stock">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
