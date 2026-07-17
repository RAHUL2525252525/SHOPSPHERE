import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import "./ProductCard.css";

const FALLBACK_IMAGE =
    "https://via.placeholder.com/300x300?text=No+Image";

function ProductCard({ product }) {

    const { addItem } = useContext(CartContext);

    const {
        addWishlistItem,
        removeWishlistItem,
        isInWishlist
    } = useContext(WishlistContext);

    const wishlist = isInWishlist(product.id);

    const images = [
        product.image1,
        product.image2,
        product.image3
    ].filter(Boolean);

    const displayImages =
        images.length > 0
        ?
        images
        :
        [FALLBACK_IMAGE];

    const [activeIndex, setActiveIndex] = useState(0);

    const hoverTimer = useRef(null);

    const displayPrice =
        product.sellingPrice ??
        product.finalPrice ??
        product.brandPrice ??
        0;

    const handleWishlist = () => {
        if (wishlist) {
            removeWishlistItem(product.id);
        } else {
            addWishlistItem(product.id);
        }
    };

    const startCycle = () => {
        if (displayImages.length <= 1) {
            return;
        }

        clearInterval(hoverTimer.current);

        let index = 0;

        hoverTimer.current = setInterval(() => {
            index = (index + 1) % displayImages.length;
            setActiveIndex(index);
        }, 900);
    };

    const stopCycle = () => {
        clearInterval(hoverTimer.current);
        hoverTimer.current = null;
        setActiveIndex(0);
    };

    return (
        <div
            className="product-card"
            onMouseEnter={startCycle}
            onMouseLeave={stopCycle}
        >
            {
                product.discount > 0 &&
                <span className="discount-badge">
                    {product.discount}% OFF
                </span>
            }

            <Link to={`/product/${product.id}`}>
                <div className="product-image-container">
                    <img
                        src={displayImages[activeIndex]}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE;
                        }}
                    />

                    {
                        displayImages.length > 1 &&
                        <div className="image-dots">
                            {
                                displayImages.map((img, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index === activeIndex
                                            ?
                                            "dot active"
                                            :
                                            "dot"
                                        }
                                    />
                                ))
                            }
                        </div>
                    }
                </div>
            </Link>

            <div className="product-info">
                <span className="product-category">
                    {product.category}
                </span>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <p className="product-price">
                    ₹ {displayPrice}
                </p>

                <div className="product-actions">
                    <button
                        className="add-cart-btn"
                        onClick={() => addItem(product.id, 1)}
                    >
                        Add Cart
                    </button>

                    <button
                        className="wishlist-btn"
                        onClick={handleWishlist}
                    >
                        {
                            wishlist
                            ?
                            "❤️"
                            :
                            "🤍"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;