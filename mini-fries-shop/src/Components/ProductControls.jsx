function ProductControls({ product, actions }) {
  const { addToCart, removeFromCart, changeQuantity } = actions;

  if (!product.inCart) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => addToCart(product.id)}
        disabled={product.quantity === 0}
      >
        {product.quantity === 0 ? "Sold Out" : "Add to Cart"}
      </button>
    );
  }

  return (
    <div className="controls">
      <div className="qty">
        <button className="btn btn-icon" onClick={() => changeQuantity(product.id, -1)} disabled={product.quantity === 0}>−</button>
        <span className="qty-value">{product.quantity}</span>
        <button className="btn btn-icon" onClick={() => changeQuantity(product.id, 1)}>+</button>
      </div>
      <button className="btn btn-outline" onClick={() => removeFromCart(product.id)}>
        Remove from Cart
      </button>
    </div>
  );
}

export default ProductControls;