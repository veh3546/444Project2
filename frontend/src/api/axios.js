import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

// Request interceptor to add token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiry
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            // Token invalid or expired
            localStorage.removeItem('userToken');
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default instance;