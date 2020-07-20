import axios from 'axios';

// this needs to come from an environment file
const baseUrl = 'https://localhost:5051/api/';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
