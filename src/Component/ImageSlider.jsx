import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length, isHovered]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            goToPrevious();
        } else if (event.key === 'ArrowRight') {
            goToNext();
        }
    };

    return (
        <div
            className="image-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={handleKeyDown}
            tabIndex="0" // Make the div focusable
        >
            <button className="prev" onClick={goToPrevious} aria-label="Previous Slide">❮</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="active" />
            <button className="next" onClick={goToNext} aria-label="Next Slide">❯</button>
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={index === currentIndex ? 'active' : ''}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
