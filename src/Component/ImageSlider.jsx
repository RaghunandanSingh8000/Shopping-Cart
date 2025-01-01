import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="image-slider">
            <button className="prev" onClick={goToPrevious}>❮</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="active" />
            <button className="next" onClick={goToNext}>❯</button>
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