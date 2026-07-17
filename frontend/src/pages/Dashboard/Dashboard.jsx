import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Banner from "../../components/Banner/Banner";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import { getAllProducts } from "../../services/productService";

import "./Dashboard.css";

const categories = [

    { label: "Mobiles", icon: "📱", value: "Mobiles" },
    { label: "Laptops", icon: "💻", value: "Laptops" },
    { label: "Fashion", icon: "👕", value: "Fashion" },
    { label: "Electronics", icon: "🎧", value: "Electronics" },
    { label: "Shoes", icon: "👟", value: "Shoes" },
    { label: "Home", icon: "🏠", value: "Home" },
    { label: "Beauty", icon: "💄", value: "Beauty" }

];

function Dashboard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get("category");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const data = await getAllProducts();
            setProducts(data);

        }
        catch (error) {

            console.log(error);
            setProducts([]);

        }
        finally {

            setLoading(false);

        }

    };

    return (
        <div className="dashboard-page">

            <Banner />

            <section className="category-quick-links">

                <Link
                    to="/products"
                    className={
                        !activeCategory
                        ?
                        "category-pill active"
                        :
                        "category-pill"
                    }
                >
                    <span className="category-pill-icon">✨</span>
                    All
                </Link>

                {

                    categories.map((cat) => (

                        <Link
                            key={cat.value}
                            to={`/products?category=${cat.value}`}
                            className={
                                activeCategory === cat.value
                                ?
                                "category-pill active"
                                :
                                "category-pill"
                            }
                        >
                            <span className="category-pill-icon">
                                {cat.icon}
                            </span>

                            {cat.label}
                        </Link>

                    ))

                }

            </section>

            <section className="featured-section">

                <h1>Featured Products</h1>

                <p>Latest products at best prices</p>

                {

                    loading ?

                    <div className="state-loading">
                        <div className="soda-spinner"></div>
                        <p>Loading products...</p>
                    </div>

                    :

                    products.length === 0 ?

                    <div className="state-empty">
                        <p>No products available</p>
                    </div>

                    :

                    <ProductGrid products={products} />

                }

            </section>

            <section className="offer-section">

                <div className="offer-card">

                    <h2>Big Sale</h2>

                    <p>Get amazing discounts on electronics</p>

                    <Link to="/products">Shop Now</Link>

                </div>

            </section>

        </div>
    );

}

export default Dashboard;