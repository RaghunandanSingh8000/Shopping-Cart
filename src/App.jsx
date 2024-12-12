import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import Footer from './Footer';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import FloatingCartButton from './FloatingCartButton'; // Import the FloatingCartButton component
import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    // Update item quantity in the cart
    const updateQuantity = (productId, newQuantity) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: Math.max(newQuantity, 1) } : item));
    };

    // Remove an item from the cart
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Clear all items in the cart
    const clearCart = () => {
        setCart([]);
    };

    // Add a product to the cart
    const addToCart = (product) => {
        
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

   
    return (
        <Router>
            <div className="app-container">
                <Header cartItemCount={cart.length} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home addToCart={addToCart} />} />
                        <Route path="/products" element={<ProductList addToCart={addToCart} clearCart={clearCart} />} />
                        <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
                        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} calculateTotal={calculateTotal} />} />
                    </Routes>
                </main>
                <Footer />
                <FloatingCartButton cartItemCount={cart.length} /> {/* Add the FloatingCartButton */}
            </div>
        </Router>
    );
}

export default App;