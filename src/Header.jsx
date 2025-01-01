import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header({ cartItemCount }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src="\Shop.png" alt="Shopc@rt Logo" />
                <h1>Shopc@rt</h1>
            </div>
            <button className="hamburger-button" onClick={toggleMenu}>
                &#9776;
            </button>
            <nav role="navigation" className={isMenuOpen ? 'open' : ''}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
                
            </nav>
        </header>
    );
}

export default Header;