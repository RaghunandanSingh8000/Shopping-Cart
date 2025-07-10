import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ImageSlider from './Component/ImageSlider';

const Home = ({ addToCart }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        addToCart(product);
    };

    const images = [
        "/Slide1.jpg",
        "/Slide2.jpg",
        "/Slide3.png",
        "/Slide8.jpg",
        "/Slide4.jpg"
    ];

    const products = [
        { id: 1, name: "Laptop", price: 1200, img: "/laptop.jpg", rating: 4.5, isNew: true },
        { id: 2, name: "Headphone", price: 200, img: "/HeadPhone.jpg", rating: 4.2 },
        { id: 3, name: "Tablet", price: 450, img: "/Tablet.jpg", rating: 4.0 },
        { id: 10, name: "PowerBank", price: 75, img: "/PowerBank.jpg", rating: 4.8, isNew: true },
        { id: 13, name: "Speaker", price: 100, img: "/Speaker.jpg", rating: 4.3 },
        { id: 6, name: "Camera", price: 500, img: "/Camera.jpg", rating: 4.6,isNew: true},
        { id: 7, name: "Television", price: 1000, img: "/Television.jpg", rating: 4.7 },
        { id: 8, name: "Earbuds", price: 100, img: "/Earbuds.jpg", rating: 4.1,isNew: true}
    ];

    return (
        <>
            <main>
                <section id="home">
                    <h1>Welcome to Shopc@rt</h1>
                    <ImageSlider images={images} autoPlay={true} interval={3000} />
                    <p>Browse our products and add them to your cart!</p>
                    <Link to="/products">
                        <button className="shop-button">Start Shopping</button>
                    </Link>
                </section>
                <section id="products">
                    <h2>Featured Products</h2>
                    <div className="product-grid">
                        {products.slice(0, 8).map((product) => (
                            <div className="product" key={product.id}>
                                <div className="product-img">
                                    <img src={product.img} alt={product.name} />
                                    {product.isNew && <span className="new-badge">New Arrival</span>}
                                </div>
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <p className="product-rating">⭐ {product.rating}</p>
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                    <button className="see-more-button" onClick={() => navigate('/products')}>
                        See More
                    </button>
                </section>
            </main>
            <Link to="/cart" className="floating-cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
           
        </>
    );
};

export default Home;