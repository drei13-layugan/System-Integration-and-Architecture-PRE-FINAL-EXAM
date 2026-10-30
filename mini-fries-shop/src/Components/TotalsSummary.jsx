function TotalsSummary({ products }) {
  const overallTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const cartItems = products.filter((p) => p.inCart);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="totals">
      <div className="total-box">
        <span className="total-label">Overall Total (all products)</span>
        <span className="total-value">₱{overallTotal.toFixed(2)}</span>
      </div>
      <div className="total-box">
        <span className="total-label">Cart ({cartItems.length} item{cartItems.length !== 1 && "s"})</span>
        <span className="total-value">₱{cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default TotalsSummary;