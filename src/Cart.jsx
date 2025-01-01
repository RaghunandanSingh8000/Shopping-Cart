import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Cart.css';
import CheckoutForm from './Component/CheckoutForm'; // Ensure the correct import path

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
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.img} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: 
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            onChange={(e) => updateQuantity(item.id, e.target.value)} 
                                            min="1"
                                        />
                                    </p>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
                        <button className="shop-button" onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                    <CheckoutForm /> {/* Include the CheckoutForm component */}
                </>
            )}
        </div>
    );
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired, // Ensure img is required
    })).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};

export default Cart;