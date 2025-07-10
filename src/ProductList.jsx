import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';
import ProductCart from './ProductCart';

function ProductList({ addToCart }) {
    const [likes, setLikes] = useState({}); // Track liked products
    const [wishlist, setWishlist] = useState([]); // Track wishlist products
    const [notification, setNotification] = useState('');

    const products = [
        { id: 1, name: 'Laptop', price: 1200, img: '/laptop.jpg' },
        { id: 2, name: 'Headphone', price: 200, img: '/HeadPhone.jpg' },
        { id: 3, name: 'Tablet', price: 450, img: '/Tablet.jpg' },
        { id: 4, name: 'Smartphone', price: 700, img: '/Smartphone.jpg' },
        { id: 5, name: 'Smartwatch', price: 300, img: '/SmartWatch.jpg' },
        { id: 6, name: 'Camera', price: 500, img: '/Camera.jpg' },
        { id: 7, name: 'Television', price: 1000, img: '/Television.jpg' },
        { id: 8, name: 'Earbuds', price: 100, img: '/Earbuds.jpg' },
        { id: 9, name: 'FlashDrive', price: 50, img: '/FlashDrive.jpg' },
        { id: 10, name: 'PowerBank', price: 75, img: '/PowerBank.jpg' },
        { id: 11, name: 'Printer', price: 250, img: '/Printer.jpg' },
        { id: 12, name: 'Scanner', price: 200, img: '/Scanner.jpg' },
        { id: 13, name: 'Speaker', price: 100, img: '/Speaker.jpg' },
        { id: 14, name: 'Router', price: 50, img: '/Router.jpg' },
        { id: 15, name: 'Mouse', price: 20, img: '/Mouse.jpg' },
        { id: 16, name: 'Keyboard', price: 100, img: '/Keyboard.jpg' },
        { id: 17, name: 'Webcam', price: 50, img: '/Webcam.jpg' },
        { id: 18, name: 'Radio', price: 300, img: '/Radio.jpg' },
        { id: 19, name: 'Computer', price: 1000, img: '/Computer.jpg' },
        { id: 20, name: 'Watch', price: 100, img: '/Watch.jpg' },
    ];

    const handleDragStart = (e, product) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const product = JSON.parse(e.dataTransfer.getData('product'));
        addToCart(product);
        showNotification(`${product.name} added to cart via drag-and-drop!`);
    };

    const toggleLike = (id) => {
        setLikes((prevLikes) => {
            const updatedLikes = { ...prevLikes, [id]: !prevLikes[id] };
            const productName = products.find((p) => p.id === id).name;
            showNotification(updatedLikes[id] ? `Liked: ${productName}` : `Unliked: ${productName}`);
            return updatedLikes;
        });

        setWishlist((prevWishlist) => {
            if (prevWishlist.includes(id)) {
                return prevWishlist.filter((productId) => productId !== id);
            } else {
                return [...prevWishlist, id];
            }
        });
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    };

    return (
        <div className="product-list">
            <h2 className="h1">Products</h2>
            {notification && <div className="notification">{notification}</div>}
            <div
                className="drop-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                aria-label="Drop area for adding products to cart"
            >
                Drag and drop products here to add to cart
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div
                        className="product"
                        key={product.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, product)}
                        aria-label={`Drag ${product.name}`}
                    >
                        <ProductCart
                            product={product}
                            onAddToCart={addToCart}
                            isLiked={likes[product.id] || false}
                            onToggleLike={() => toggleLike(product.id)}
                        />
                    </div>
                ))}
            </div>
            
        
        </div>
    );
}

ProductList.propTypes = {
    addToCart: PropTypes.func.isRequired,
};

export default ProductList;