import React, { useState, useEffect } from 'react';
import './Admin.css'; // Make sure Admin.css is in the same folder as this file

const API_BASE = 'http://localhost:8000';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: null });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch products, users, and orders
    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/orders/all`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('description', newProduct.description);
            if (newProduct.image) {
                formData.append('image', newProduct.image);
            }

            const response = await fetch(`${API_BASE}/api/products`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                fetchProducts();
                setNewProduct({ name: '', price: '', description: '', image: null });
                alert('Product added successfully!');
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', editingProduct.name);
            formData.append('price', editingProduct.price);
            formData.append('description', editingProduct.description);
            if (editingProduct.image) {
                formData.append('image', editingProduct.image);
            }

            const response = await fetch(`${API_BASE}/api/products/${editingProduct._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                fetchProducts();
                setEditingProduct(null);
                alert('Product updated successfully!');
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${API_BASE}/api/products/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchProducts();
                    alert('Product deleted successfully!');
                } else {
                    alert('Failed to delete product.');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <p>Welcome to the admin panel. Manage your shopping cart application here.</p>

            <section className="manage-products">
                <h2>Manage Products</h2>
                <div className="add-edit-product">
                    <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={editingProduct ? editingProduct.name : newProduct.name}
                        onChange={(e) =>
                            editingProduct
                                ? setEditingProduct({ ...editingProduct, name: e.target.value })
                                : setNewProduct({ ...newProduct, name: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={editingProduct ? editingProduct.price : newProduct.price}
                        onChange={(e) =>
                            editingProduct
                                ? setEditingProduct({ ...editingProduct, price: e.target.value })
                                : setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Product Description"
                        value={editingProduct ? editingProduct.description : newProduct.description}
                        onChange={(e) =>
                            editingProduct
                                ? setEditingProduct({ ...editingProduct, description: e.target.value })
                                : setNewProduct({ ...newProduct, description: e.target.value })
                        }
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            editingProduct
                                ? setEditingProduct({ ...editingProduct, image: e.target.files[0] })
                                : setNewProduct({ ...newProduct, image: e.target.files[0] })
                        }
                    />
                    <button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingProduct && (
                        <button onClick={() => setEditingProduct(null)} className="cancel-button">
                            Cancel
                        </button>
                    )}
                </div>

                <div className="product-list">
                    <h3>Product List</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                                <span>{product.name} - ${product.price}</span>
                                <button onClick={() => setEditingProduct(product)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="manage-orders">
                <h2>Manage Orders</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <span>
                                Order #{order._id} | User: {order.userId?.name || order.userId} | Status: {order.status} | Total: ${order.totalAmount}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="manage-users">
                <h2>Manage Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <span>{user.name} ({user.email})</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Admin;