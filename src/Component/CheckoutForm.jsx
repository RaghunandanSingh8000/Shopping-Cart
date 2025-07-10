import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CheckoutForm.css';

const CheckoutForm = ({ placeOrder }) => {
    const location = useLocation();
    const cart = location.state?.cart || [];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock validation and submission
        if (!name || !email || !address || !city || !state || !zip) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        console.log('Order submitted:', { 
            name, email, address, city, state, zip, paymentMethod, cart 
        });
        
        placeOrder(navigate);
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            {/* Progress Indicator */}
            <div className="progress-indicator">
                <ul>
                    <li className="completed">Cart</li>
                    <li className="current">Checkout</li>
                    <li>Order Confirmation</li>
                </ul>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Billing Details</h2>

                {/* Form Fields */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                        type="text"
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bankTransfer">Bank Transfer</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>

                {/* Error Message */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Submit Button */}
                <button type="submit" className="checkout-button">Place Order</button>
            </form>

            {/* Secure Checkout Badge */}
            <div className="secure-checkout">
                <p><i className="fas fa-lock"></i> Secure Checkout - Your data is protected</p>
            </div>
        </div>
    );
};

CheckoutForm.propTypes = {
    placeOrder: PropTypes.func.isRequired,
};

export default CheckoutForm;