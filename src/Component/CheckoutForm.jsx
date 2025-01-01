import React, { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted', { name, email, address, city, state, zip });
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
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
            <button type="submit" className="checkout-button">Place Order</button>
        </form>
    );
};

export default CheckoutForm;