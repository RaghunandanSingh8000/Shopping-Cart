import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductDetails.css';

function ProductDetails({ addToCart }) {
    const { id } = useParams();
    console.log("Product ID from URL:", id);

    // Sample static product data
    const products = [
        { id: "1", name: "Laptop", price: 1200, img: "/laptop.jpeg", description: "High-performance laptop", brandName: "Hp", processor: "Intel Core i5", ram: "8GB", storage: "512GB SSD", display: "15.6-inch FHD", graphics: "Intel UHD Graphics", battery: "Up to 8 hours" },
        { id: "2", name: "Headphone", price: 200, img: "/HeadPhone.jpeg", description: "Noise-cancelling headphones.", brandName: "Sony", type: "Over-ear", connectivity: "Bluetooth", battery: "Up to 30 hours", color: "Black" },
        { id: "3", name: "Tablet", price: 450, img: "/Tablet.jpeg", description: "Compact and powerful tablet.", brandName: "Sony", display: "10.2-inch Retina display", processor: "A12 Bionic chip", storage: "32GB", camera: "8MP rear camera", battery: "Up to 10 hours" },
        { id: "4", name: "Smartphone", price: 700, img: "/Smartphone.jpeg", description: "Latest smartphone model.", brandName: "Samsung", display: "6.5-inch Super AMOLED", processor: "Exynos 2100", ram: "8GB", storage: "128GB", camera: "64MP main camera", battery: "4500mAh" },
        { id: "5", name: "Smartwatch", price: 300, img: "/SmartWatch.jpeg", description: "Feature-rich smartwatch.", brandName: "Sony", display: "1.4-inch AMOLED", sensors: "Heart rate, SpO2", battery: "Up to 7 days", waterResistant: "Yes" },
        { id: "6", name: "Camera", price: 500, img: "/Camera.jpeg", description: "Capture every moment.", brandName: "Canon", type: "DSLR", sensor: "24.1MP APS-C CMOS", lens: "EF-S 18-55mm", display: "3-inch LCD", battery: "Up to 500 shots" },
        { id: "7", name: "Television", price: 1000, img: "/Television.jpeg", description: "Ultra HD smart TV.", brandName: "LG", display: "55-inch 4K UHD", resolution: "3840 x 2160", refreshRate: "60Hz", connectivity: "Wi-Fi, Bluetooth", sound: "20W speakers", warranty: "1 year" },
        { id: "8", name: "Earbuds", price: 100, img: "/Earbuds.jpeg", description: "Wireless earbuds.", brandName: "Sony", type: "In-ear", connectivity: "Bluetooth", battery: "Up to 8 hours", color: "black" },
        { id : "9", name: "FlashDrive", price: 50, img: "/FlashDrive.jpeg", description: "High-speed flash drive.", brandName: "SanDisk", capacity: "128GB", connectivity: "USB 3.0", color: "White" },
        { id: "10", name: "PowerBank", price: 75, img: "/PowerBank.jpeg", description: "Portable power bank.", brandName: "Mi", capacity: "10000mAh", color: "Black"  },
        { id: "11", name: "Printer", price: 250, img: "/Printer.jpg", description: "All-in-one printer.", brandName: "Canon", type: "Inkjet", resolution: "4800 x 1200 dpi", connectivity: "Wi-Fi, USB", warranty: "1 year" },
        { id: "12", name: "Scanner", price: 200, img: "/Scanner.jpeg", description: "High-speed scanner.", brandName: "Epson", resolution: "1200 x 2400 dpi", color: "Black", warranty: "1 year" },
        { id: "13", name: "Speaker", price: 100, img: "/Speaker.png", description: "Portable Bluetooth speaker.", brandName: "JBL", sound: "20W", battery: "Up to 12 hours", color: "white" },
        { id: "14", name: "Router", price: 50, img: "/Router.jpeg", description: "High-speed Wi-Fi router.", brandName: "TP-Link", speed: "1200Mbps", connectivity: "Wi-Fi, Ethernet", color: "White" },
        { id: "15", name: "Mouse", price: 20, img: "/Mouse.jpg", description: "Wireless mouse.", brandName: "Logitech", type: "Optical", connectivity: "USB", color: "Black" },
        { id: "16", name: "Keyboard", price: 100, img: "/Keyboard.jpeg", description: "Mechanical gaming keyboard.", brandName: "Razer", type: "Mechanical", connectivity: "USB", color: "Black" },
        { id: "17", name: "Webcam", price: 50, img: "/Webcam.jpg", description: "HD webcam with microphone.", brandName: "Logitech", resolution: "1080p", connectivity: "USB", color: "Black" },
        { id: "18", name: "Radio", price: 300, img: "/Radio.jpeg", description: "Portable AM/FM radio.", brandName: "Sony", type: "AM/FM", color: "Black" }

    ];

    const product = products.find(p => p.id === id);
    console.log("Product found:", product);

    // Handle case when product is not found
    if (!product) {
        return <div className="product-details-error">Product not found.</div>;
    }

    return (
        <div className="product-details">
            <img className="product-image" src={product.img} alt={`Image of ${product.name}`} />
            <div className="product-info">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <p><strong>Brand Name:</strong> {product.brandName}</p>
                {product.processor && <p><strong>Processor:</strong> {product.processor}</p>}
                {product.ram && <p><strong>RAM:</strong> {product.ram}</p>}
                {product.storage && <p><strong>Storage:</strong> {product.storage}</p>}
                {product.display && <p><strong>Display:</strong> {product.display}</p>}
                {product.graphics && <p><strong>Graphics:</strong> {product.graphics}</p>}
                {product.battery && <p><strong>Battery:</strong> {product.battery}</p>}
                {product.type && <p><strong>Type:</strong> {product.type}</p>}
                {product.connectivity && <p><strong>Connectivity:</strong> {product.connectivity}</p>}
                {product.color && <p><strong>Color:</strong> {product.color}</p>}
                {product.camera && <p><strong>Camera:</strong> {product.camera}</p>}
                {product.sensors && <p><strong>Sensors:</strong> {product.sensors}</p>}
                {product.waterResistant && <p><strong>Water Resistant:</strong> {product.waterResistant}</p>}
                {product.sensor && <p><strong>Sensor:</strong> {product.sensor}</p>}
                {product.lens && <p><strong>Lens:</strong> {product.lens}</p>}
                {product.resolution && <p><strong>Resolution:</strong> {product.resolution}</p>}
                {product.refreshRate && <p><strong>Refresh Rate:</strong> {product.refreshRate}</p>}
                {product.sound && <p><strong>Sound:</strong> {product.sound}</p>}
                {product.warranty && <p><strong>Warranty:</strong> {product.warranty}</p>}
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}

ProductDetails.propTypes = {
    addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;