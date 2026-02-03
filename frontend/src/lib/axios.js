import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5001/api" });

api.interceptors.request.use((config) => {
    const raw = localStorage.getItem("todo_auth");
    if (raw) {
        try {
            const { token } = JSON.parse(raw);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            return config;
        }
    }
    return config;
});

export default api;
