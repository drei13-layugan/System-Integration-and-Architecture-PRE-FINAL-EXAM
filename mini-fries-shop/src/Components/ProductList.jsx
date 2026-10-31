import { Link, useParams } from "react-router-dom";
import ProductControls from "./ProductControls.jsx";
import { LOW_STOCK_THRESHOLD, FALLBACK_IMAGE } from "../constants.js";

function ProductDetail({ products, actions }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section>
        <p className="empty">Product not found.</p>
        <Link to="/" className="details-link">← Back to menu</Link>
      </section>
    );
  }

  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity < LOW_STOCK_THRESHOLD;

  return (
    <section className="detail">
      <Link to="/" className="details-link">← Back to menu</Link>

      <div className="detail-layout">
        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />

        <div className="detail-info">
          <div className="card-top">
            <span className="badge">{product.category}</span>
            {isLowStock && <span className="badge badge-low">Low Stock</span>}
          </div>

          <h2>{product.name}</h2>
          <p className="rating">★ {Number(product.rating).toFixed(1)} / 5</p>

          <h4>Description</h4>
          <p>{product.description}</p>

          <h4>Specification</h4>
          <p>{product.specification}</p>

          <dl className="card-figures detail-figures">
            <div><dt>Price</dt><dd>₱{product.price.toFixed(2)}</dd></div>
            <div><dt>Quantity</dt><dd className={isLowStock ? "text-low" : ""}>{product.quantity}</dd></div>
            <div><dt>Subtotal</dt><dd>₱{subtotal.toFixed(2)}</dd></div>
          </dl>

          <ProductControls product={product} actions={actions} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;