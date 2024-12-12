import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header({ cartItemCount }) {
    return (
        <header className="header">
            <div className="logo">
                <img src="\Shop.png" alt="Shopc@rt Logo" />
                <h1>Shopc@rt</h1>
            </div>
            <nav role="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
                <div className="cart-icon">
                    <Link to="/cart">
                        <span> Cart </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;







































