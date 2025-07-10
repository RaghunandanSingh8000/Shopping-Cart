import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products`, product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const signup = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, user);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const signin = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signin`, user);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};