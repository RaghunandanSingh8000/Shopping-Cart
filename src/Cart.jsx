import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Cart.css';

function Cart({ cart, removeFromCart, updateQuantity, clearCart }) {
    const navigate = useNavigate(); // Initialize useNavigate

    const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart">
            <h2>Cart Items</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <button className="shop-button" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
                                <div>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
                        <button className="shop-button" onClick={() => navigate('/')}>
                            Continue Shopping
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};

export default Cart;