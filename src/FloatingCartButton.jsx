import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './FloatingCartButton.css';

const FloatingCartButton = ({ cartItemCount }) => {
    return (
        <Link to="/cart" className="floating-cart-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
    );
};

export default FloatingCartButton; // Ensure this is a default export