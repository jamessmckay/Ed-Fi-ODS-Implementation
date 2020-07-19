import axios from 'axios';

const baseUrl = 'https://localhost:5051/api/';

// return a generic dto with the actions associated to an endpoint
// export default {
//   sandbox(url = baseUrl + 'sandbox/') {
//     return {
//       fetchAll: () => axios.get(url),

//       // fetchById: (id) => axios.get(url + id),
//       // for future crud actions
//       //      create: (newRecord) => axios.post(url, newRecord),
//       //      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
//       //      delete: (id) => axios.delete(url + id)
//     };
//   },
// };

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
    return config;
  },
  (error) => Promise.reject(error),
);
export default api;
