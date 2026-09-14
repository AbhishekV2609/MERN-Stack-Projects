import { useLocation } from "react-router-dom";
import { data } from "../utils/Data";
import "./Search.css"

function Search() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryName = params.get("category");
    const query = params.get("query")?.toLowerCase() || "";

    // Find the category object
    const category = categoryName === "All"
        ? { products: data.flatMap(c => c.products), topTrendingProducts: data.flatMap(c => c.topTrendingProducts) }
        : data.find(c => c.categoryName === categoryName);

    if (!category) return <h2>No category found!</h2>;

    // Filter products based on search query
    const filteredProducts = category.products.filter(p =>
        p.productName.toLowerCase().includes(query)
    );

    return (
        <div className="search-page">
            <h2>Search Results for "{query}" in {categoryName}</h2>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(p => (
                        <div key={p.productId} className="product-card">
                            <img src={p.productImage} alt={p.productName} />
                            <h3>{p.productName}</h3>
                            <p>₹{p.price}</p>
                            {category.topTrendingProducts.some(tp => tp.productId === p.productId) && (
                                <span className="top-trending">Top Trending</span>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Search;