import { Link } from "react-router-dom";
import ProductControls from "./ProductControls.jsx";
import { LOW_STOCK_THRESHOLD, FALLBACK_IMAGE } from "../constants.js";

function ProductCard({ product, actions }) {
  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity < LOW_STOCK_THRESHOLD;

  return (
    <article className={`card ${isLowStock ? "card-low" : ""}`}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
      </Link>

      <div className="card-body">
        <div className="card-top">
          <span className="badge">{product.category}</span>
          {isLowStock && <span className="badge badge-low">Low Stock</span>}
        </div>

        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <dl className="card-figures">
          <div><dt>Price</dt><dd>₱{product.price.toFixed(2)}</dd></div>
          <div><dt>Quantity</dt><dd className={isLowStock ? "text-low" : ""}>{product.quantity}</dd></div>
          <div><dt>Subtotal</dt><dd>₱{subtotal.toFixed(2)}</dd></div>
        </dl>

        <ProductControls product={product} actions={actions} />

        <Link to={`/product/${product.id}`} className="details-link">View details →</Link>
      </div>
    </article>
  );
}

export default ProductCard;