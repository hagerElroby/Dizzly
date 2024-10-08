import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dizzly-main-dev.dev.dizzly-store.com/',
  headers: {
    'Content-Type': 'application/json',
    'appname': 'Dizzly',
    'version': '1',
    'os': 'web',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;