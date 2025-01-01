import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ImageSlider from './Component/ImageSlider';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';

const Home = ({ addToCart }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        addToCart(product);
    };

    const images = [
        "/Slide1.jpg ",
        "/Slide2.jpg",
        "/Slide3.png",
        "/Slide8.jpg",
        "/Slide4.jpg"
    ];

    const products = [
        { id: 1, name: "Laptop", price: 1200, img: "/laptop.jpg"},
        { id: 2, name: "Headphone", price: 200, img: "/HeadPhone.jpg" },
        { id: 3, name: "Tablet", price: 450, img: "/Tablet.jpg" },
        { id:10 , name: "PowerBank", price: 75, img: "/PowerBank.jpg" },
        {id:13, name: "Speaker", price: 100, img: "/Speaker.jpg" },
        { id: 6, name: "Camera", price: 500, img: "/Camera.jpg" },
        { id: 7, name: "Television", price: 1000, img: "/Television.jpg" },
        { id: 8, name: "Earbuds", price: 100, img: "/Earbuds.jpg" }
    ];

    return (
        <>
            <main>
                <section id="home">
                    <h1>Welcome to Shopc@rt</h1>
                    <ImageSlider images={images} /> {/* Pass the images array as a prop */}
                    <p>Browse our products and add them to your cart !</p>
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
                                </div>
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
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