import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import AddProductForm from "./components/AddProductForm.jsx";

// Swap this for a real API URL later if you want
const PRODUCTS_URL = "/products.json";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products once, when the app first opens
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(PRODUCTS_URL);
        if (!res.ok) throw new Error("Failed to load products.");
        const data = await res.json();
        setProducts(data.map((p) => ({ ...p, inCart: false })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now(), inCart: false }]);
  };

  const addToCart = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inCart: true } : p)));
  };

  const removeFromCart = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inCart: false } : p)));
  };

  // delta is +1 or -1; quantity never goes below 0
  const changeQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  const productActions = { addToCart, removeFromCart, changeQuantity };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍟 Mini Fries Shop</h1>
        <nav>
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/add">Add Product</NavLink>
        </nav>
      </header>

      <main>
        {loading && <p className="empty">Heating up the fryer...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <Routes>
            <Route path="/" element={<ProductList products={products} actions={productActions} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} actions={productActions} />} />
            <Route path="/add" element={<AddProductForm onAddProduct={addProduct} />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;