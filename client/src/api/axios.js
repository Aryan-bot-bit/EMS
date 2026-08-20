import axios from "axios";

const baseUrl = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/+$/, "");

const api = axios.create({
    baseURL: baseUrl
});

// Attach Auth token to all network requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;