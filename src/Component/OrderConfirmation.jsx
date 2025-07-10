import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div className="order-confirmation-container">
            <h2>Order Confirmation</h2>
            <p>Thank you for your purchase! Your order has been placed successfully.</p>
            <button onClick={handleContinueShopping} className="continue-shopping-button">
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderConfirmation;