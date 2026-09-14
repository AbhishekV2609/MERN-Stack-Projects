import "./LaptopCard.css";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
function LaptopCard({ product, handleProductSingle }) {
  const navigate = useNavigate();
  const params = useParams();
  const categoryName = params.categoryName;
  const cid = params.id;
  console.log("laptop card");
  


  return (
    <div className="laptop-card">
      <h2 className="laptop-title">{product?.productName}</h2>
      <img src={product?.productImage} alt="product-info" />
      <div className="rating">
        {/* <div className="stars">{renderStars(productWithDetails.rating)}</div> */}
        <span className="rating-count">
          ({product.productRating} reviews)
        </span>
      </div>

      <div className="price-section">
        <span className="price">
          ₹{product?.price}
          <span className="price-currency">.00</span>
        </span>
      </div>

      <button className="details-btn" onClick={() => {
        handleProductSingle(product)
        navigate(`/laptop-detail/category/${categoryName}/${cid}/product/${product?.productName}/${product?.productId}`)
      }}>View More Details</button>
    </div>
  );
}

export default LaptopCard;
