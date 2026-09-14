import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../utils/Data"; // Make sure your data.js is imported correctly

function Navbar({ mycart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?category=${selectedCategory}&query=${searchQuery}`);
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/">
        <div className="logo">
          <h1 className="navbar-title">Laptop देखो</h1>
        </div>
      </Link>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Search Bar */}
      <form className="search-form" onSubmit={handleSearch}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="search-category"
        >
          <option value="All">All Categories</option>
          {data.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Nav Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {/* <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/category">Category</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/mycart">
            Mycart{" "}
            <span>{mycart.length > 0 && <span>{mycart.length}</span>}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;