import React, { useState } from 'react';
import './OrderButton.css';

const OrderButton = ({ userId, products, totalAmount, onSuccess, onError }) => {
    const [isLoading, setIsLoading] = useState(false);

    const placeOrder = async () => {
        const orderData = {
            userId, // Dynamic user ID
            products, // Dynamic products
            totalAmount, // Dynamic total amount
        };

        try {
            setIsLoading(true); // Set loading state
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Order placed successfully:', data);
                if (onSuccess) onSuccess(data); // Call success callback
            } else {
                console.error('Error placing order:', data.error);
                if (onError) onError(data.error); // Call error callback
            }
        } catch (error) {
            console.error('Failed to connect to the server:', error);
            if (onError) onError('Failed to connect to the server.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <button
            onClick={placeOrder}
            disabled={isLoading}
            className={`order-button ${isLoading ? 'loading' : ''}`}
        >
            {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
    );
};

export default OrderButton;