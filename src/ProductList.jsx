import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';
import ProductCart from './ProductCart';

function ProductList({ addToCart }) {
    const [draggedProduct, setDraggedProduct] = useState(null);

    const products = [
        { id: 1, name: "Laptop", price: 1200, img: "/laptop.jpeg" },
        { id: 2, name: "Headphone", price: 200, img: "/HeadPhone.jpeg" },
        { id: 3, name: "Tablet", price: 450, img: "/Tablet.jpeg" },
        { id: 4, name: "Smartphone", price: 700, img: "/Smartphone.jpeg" },
        { id: 5, name: "Smartwatch", price: 300, img: "/SmartWatch.jpeg" },
        { id: 6, name: "Camera", price: 500, img: "/Camera.jpeg" },
        { id: 7, name: "Television", price: 1000, img: "/Television.jpeg" },
        { id: 8, name: "Earbuds", price: 100, img: "/Earbuds.jpeg" },
        { id: 9, name: "FlashDrive", price: 50, img: "/FlashDrive.jpeg" },
        { id: 10, name: "PowerBank", price: 75, img: "/PowerBank.jpeg" },
        { id: 11, name: "Printer", price: 250, img: "/Printer.jpg" },
        { id: 12, name: "Scanner", price: 200, img: "/Scanner.jpeg" },
        { id: 13, name: "Speaker", price: 100, img: "/Speaker.png" },
        { id: 14, name: "Router", price: 50, img: "/Router.jpeg" },
        { id: 15, name:"Mouse", price: 20, img: "/Mouse.jpg" },
        { id: 16, name: "Keyboard", price: 100, img: "/Keyboard.jpeg" },
        { id: 17, name: "Webcam", price: 500, img: "/Webcam.jpg" },
        { id: 18, name: "Radio", price: 300, img: "/Radio.jpeg" },



    ];

    const handleDragStart = (e, product) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
        setDraggedProduct(product);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const product = JSON.parse(e.dataTransfer.getData('product'));
        addToCart(product);
        alert(`${product.name} added to cart via drag-and-drop!`);
    };

    return (
        <div className="product-list">
            <h2 class="h1">Products</h2>
          
            <div className="product-grid">
                {products.map((product) => (
                    <div
                        className="product"
                        key={product.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, product)}
                    >
                        <ProductCart product={product} onAddToCart={addToCart} />
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