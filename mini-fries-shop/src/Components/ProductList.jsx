import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import TotalsSummary from "./TotalsSummary.jsx";

function ProductList({ products, actions }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section>
      <TotalsSummary products={products} />

      <div className="toolbar">
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <span className="result-count">
          {visibleProducts.length} product{visibleProducts.length !== 1 && "s"}
        </span>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="empty">No products in this category.</p>
      ) : (
        <div className="grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} actions={actions} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;