import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import Footer from './Footer';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import FloatingCartButton from './FloatingCartButton';
import './App.css';
import SignIn from './Component/SignIn';
import CheckoutForm from './Component/CheckoutForm';
import OrderConfirmation from './Component/OrderConfirmation';
import Admin from '/src/Admin/Admin.jsx';

function App() {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

    // Show notification with a message
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    // Add a product to the cart
    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        }
        showNotification(`${product.name} has been added to the cart!`);
    };

    // Update the quantity of a product in the cart
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    // Remove a product from the cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        showNotification('Product removed from the cart.');
    };

    // Clear the entire cart
    const clearCart = () => {
        setCart([]);
        showNotification('Cart has been cleared.');
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Place an order
    const placeOrder = async (navigate) => {
        try {
            const response = await fetch('http://localhost:5000/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }),
            });

            const data = await response.json();
            if (response.ok) {
                clearCart();
                showNotification('Order placed successfully!');
                navigate('/order-confirmation');
            } else {
                showNotification(`Failed to place order: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to connect to the server. Please try again later.');
        }
    };

    // Protect the admin route
    const ProtectedRoute = ({ children }) => {
        if (!isSignedIn || !isAdmin) {
            return <Navigate to="/signin" />;
        }
        return children;
    };

    return (
        <Router>
            <div className="app-container">
                <Header cartItemCount={cart.length} />
                <main className="main-content">
                    {notification && <div className="notification">{notification}</div>}
                    <Routes>
                        <Route path="/" element={<Home addToCart={addToCart} />} />
                        <Route
                            path="/products"
                            element={<ProductList addToCart={addToCart} clearCart={clearCart} />}
                        />
                        <Route
                            path="/products/:id"
                            element={<ProductDetails addToCart={addToCart} />}
                        />
                        <Route
                            path="/cart"
                            element={
                                <Cart
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    calculateTotal={calculateTotal}
                                />
                            }
                        />
                        <Route path="/signin" element={<SignIn setIsSignedIn={setIsSignedIn} />} />
                        <Route path="/checkout" element={<CheckoutForm placeOrder={placeOrder} />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
                <FloatingCartButton cartItemCount={cart.length} />
            </div>
        </Router>
    );
}

export default App;