import { useState } from "react";
import "./ProductForm.css";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Product Added:", product);
    alert("Product added successfully!");
    setProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  return (
    <div className="product-supportpage">
      <h2 className="product-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Name & Price Row */}
        <div className="product-name-row">
          <div className="productform-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="productform-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        <div className="productform-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="productform-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className="productform-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Paste image URL"
          />
        </div>

        <button type="submit" className="product-submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
