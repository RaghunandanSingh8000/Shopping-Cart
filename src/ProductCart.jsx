import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCart.css';

const ProductCart = ({ product, onAddToCart, isLiked, onToggleLike }) => {
    return (
        <div className="product-cart">
            <Link to={`/products/${product.id}`}>
                <img src={product.img} alt={product.name} />
            </Link>
            <h2>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className="product-actions">
                <button onClick={() => onAddToCart(product)}>Add to Cart</button>
              
            </div>
        </div>
    );
};

export default ProductCart;
