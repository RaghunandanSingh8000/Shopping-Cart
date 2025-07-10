import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import OrderButton from './Component/OrderButton';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, calculateTotal }) => {
    const navigate = useNavigate();
    const [savedForLater, setSavedForLater] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const freeShippingThreshold = 100; // Free shipping for orders above $100
    const totalAmount = calculateTotal();
    const progress = Math.min((totalAmount / freeShippingThreshold) * 100, 100);

    const handleOrderSuccess = (data) => {
        alert('Order placed successfully!');
        console.log('Order details:', data);
        clearCart();
        navigate('/');
    };

    const handleOrderError = (error) => {
        alert(`Failed to place order: ${error}`);
    };

    const handleSaveForLater = (item) => {
        if (window.confirm(`Are you sure you want to save "${item.name}" for later?`)) {
            setSavedForLater((prev) => [...prev, item]);
            removeFromCart(item.id);
            alert(`${item.name} has been saved for later.`);
        }
    };

    const handleMoveToWishlist = (item) => {
        if (window.confirm(`Are you sure you want to move "${item.name}" to your wishlist?`)) {
            setWishlist((prev) => [...prev, item]);
            removeFromCart(item.id);
            alert(`${item.name} has been moved to your wishlist.`);
        }
    };

    const handleRestoreToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            updateQuantity(item.id, existingItem.quantity + (item.quantity || 1));
        } else {
            updateQuantity(item.id, item.quantity || 1);
        }
        setSavedForLater((prev) => prev.filter((savedItem) => savedItem.id !== item.id));
        setWishlist((prev) => prev.filter((wishlistItem) => wishlistItem.id !== item.id));
        alert(`${item.name} has been restored to your cart.`);
    };

    const confirmClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            clearCart();
        }
    };

    const getEstimatedDeliveryDate = () => {
        const today = new Date();
        const deliveryDate = new Date(today.setDate(today.getDate() + 5)); // 5 days from today
        return deliveryDate.toDateString();
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <div className="empty-cart-container">
                    <p className="empty-cart-message">Your cart is empty. Start shopping now!</p>
                    <button
                        className="continue-shopping-button"
                        onClick={() => navigate('/')}
                    >
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
                                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <p>Estimated Delivery: {getEstimatedDeliveryDate()}</p>
                                    <p className="number">
                                        Quantity:
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                                            }
                                            min="1"
                                        />
                                    </p>
                                    <div className="cart-item-actions">
                                        <button
                                            className="action-button remove-button"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to remove this item from the cart?')) {
                                                    removeFromCart(item.id);
                                                }
                                            }}
                                            title="Remove this item from your cart"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="action-button save-button"
                                            onClick={() => handleSaveForLater(item)}
                                            title="Save this item for later"
                                        >
                                            Save for Later
                                        </button>
                                        <button
                                            className="action-button wishlist-button"
                                            onClick={() => handleMoveToWishlist(item)}
                                            title="Move this item to your wishlist"
                                        >
                                            Move to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h3>Subtotal: ${totalAmount}</h3>
                        <h3>Total: ${totalAmount}</h3>
                        <div className="free-shipping-progress">
                            <p>
                                {totalAmount >= freeShippingThreshold
                                    ? 'You qualify for free shipping!'
                                    : `Spend $${(freeShippingThreshold - totalAmount).toFixed(2)} more for free shipping.`}
                            </p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <button className="clear-cart-button" onClick={confirmClearCart}>
                            Clear Cart
                        </button>
                        <button className="continue-shopping-button" onClick={() => navigate('/')}>
                            Continue Shopping
                        </button>
                        <OrderButton
                            userId="64f1234567890abcdef12345"
                            products={cart.map((item) => ({
                                productId: item.id,
                                quantity: item.quantity,
                            }))}
                            totalAmount={totalAmount}
                            onSuccess={handleOrderSuccess}
                            onError={handleOrderError}
                        />
                    </div>
                </>
            )}
            {savedForLater.length > 0 && (
                <div className="saved-for-later">
                    <h2>Saved for Later</h2>
                    <ul className="saved-list">
                        {savedForLater.map((item) => (
                            <li key={item.id} className="saved-item">
                                <img src={item.img} alt={item.name} className="saved-item-image" />
                                <div className="saved-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <button onClick={() => handleRestoreToCart(item)}>Move to Cart</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {wishlist.length > 0 && (
                <div className="wishlist">
                    <h2>Your Wishlist</h2>
                    <ul className="wishlist-list">
                        {wishlist.map((item) => (
                            <li key={item.id} className="wishlist-item">
                                <img src={item.img} alt={item.name} className="wishlist-item-image" />
                                <div className="wishlist-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <button onClick={() => handleRestoreToCart(item)}>Move to Cart</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Cart;