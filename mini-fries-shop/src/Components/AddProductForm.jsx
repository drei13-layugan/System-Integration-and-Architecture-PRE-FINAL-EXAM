import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  image: "", name: "", category: "", description: "",
  specification: "", rating: "", price: "", quantity: "",
};

function AddProductForm({ onAddProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Turn an uploaded image file into a data URL so it can be displayed
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.image.trim()) newErrors.image = "Feature image is required.";
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.specification.trim()) newErrors.specification = "Specification is required.";

    if (form.rating === "") newErrors.rating = "Rating is required.";
    else if (Number(form.rating) < 0 || Number(form.rating) > 5)
      newErrors.rating = "Rating must be between 0 and 5.";

    if (form.price === "") newErrors.price = "Price is required.";
    else if (Number(form.price) <= 0) newErrors.price = "Price must be greater than 0.";

    if (form.quantity === "") newErrors.quantity = "Quantity is required.";
    else if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 0)
      newErrors.quantity = "Quantity must be a whole number (0 or more).";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onAddProduct({
      image: form.image.trim(),
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      specification: form.specification.trim(),
      rating: Number(form.rating),
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    setForm(emptyForm);
    navigate("/");
  };

  return (
    <section className="form-section">
      <h2>Add New Product</h2>
      <p className="hint">All fields are required.</p>

      <form onSubmit={handleSubmit} noValidate className="product-form">
        <div className="field full">
          <label htmlFor="image">Feature Image (URL or upload)</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={form.image.startsWith("data:") ? "(uploaded image)" : form.image}
            onChange={handleChange}
            readOnly={form.image.startsWith("data:")}
          />
          <input type="file" accept="image/*" onChange={handleImageFile} />
          {form.image && <img src={form.image} alt="Preview" className="preview" />}
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <div className="field">
          <label htmlFor="name">Product Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="category">Product Category</label>
          <input id="category" name="category" type="text" placeholder="e.g. Fries, Sauces, Drinks" value={form.category} onChange={handleChange} />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="field full">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="field full">
          <label htmlFor="specification">Product Specification</label>
          <textarea id="specification" name="specification" rows="2" placeholder="e.g. Regular, 120 g • Lightly salted" value={form.specification} onChange={handleChange} />
          {errors.specification && <span className="error">{errors.specification}</span>}
        </div>

        <div className="field">
          <label htmlFor="rating">Rating (0–5)</label>
          <input id="rating" name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        <div className="field">
          <label htmlFor="price">Price (₱)</label>
          <input id="price" name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="field">
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="field full">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </section>
  );
}

export default AddProductForm;