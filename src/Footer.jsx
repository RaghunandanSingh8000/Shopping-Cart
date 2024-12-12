import React from 'react';
import './Footer.css';

const socialLinks = [
    { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter" },
    { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" }
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="footer-sections">
                    <div className="footer-about">
                        <h4>About Us</h4>
                        <p>
                            ShopCart is a leading e-commerce platform, offering a seamless online shopping experience 
                            with a user-friendly shopping cart that makes it easy to browse, select, and purchase products.
                            Our mission is to simplify online shopping, from cart to checkout.
                        </p>
                    </div>
                    <div className="footer-terms">
                        <h4>Terms & Conditions</h4>
                        <p>
                            By using our shopping cart, you agree to our policies regarding order processing, payments, 
                            and returns. Please ensure that your cart items are reviewed before checkout. For more details, 
                            visit our  page.
                        </p>
                    </div>
                    <div className="footer-contact">
                        <h4>Contact Us</h4>
                        <p>Email: <a href="mailto:support@shopcart.com">support@shopcart.com</a></p>
                        <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
                    </div>
                </section>
                <nav className="footer-social" aria-label="Social Media Links">
                    {socialLinks.map((link, index) => (
                        <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                            <i className={link.icon} aria-label={link.label}></i>
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
