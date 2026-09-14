
import "./Footer.css";
import cycle from "../assets/cycle-Footer-img-unscreen.gif"
import car from "../assets/car2.gif"
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>Laptop_DEKHO</h2>
          <p>
            Your one-stop shop for best laptops online. Stay connected with the latest technology.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Twitter" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <p>© 2025 Laptop_DEKHO. All Rights Reserved.</p>
      </div>
      <div className="footer-animation">
        <img src={cycle} alt="Cycle" className="cycle" />
        <img src={car} alt="Car" className="car" />
      </div>

      <div className="footer-bottom">
        <p>© 2025 Laptop_DEKHO. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;


