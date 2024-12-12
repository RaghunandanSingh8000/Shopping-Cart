import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="image-slider">
            <button className="prev" onClick={prevSlide}>&#9664;</button> {/* Left arrow */}
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index}`}
                    className={index === currentIndex ? 'active' : ''}
                />
            ))}
            <button className="next" onClick={nextSlide}>&#9654;</button> {/* Right arrow */}
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={index === currentIndex ? 'active' : ''}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;