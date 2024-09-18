import axios from 'axios';
import {getItem} from 'expo-secure-store';

axios.defaults.baseURL = process.env.EXPO_PUBLIC_APP_BACKEND;

// Add an interceptor to include the Authorization Bearer token in every request
let token = getItem('token');
axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
  

export default axios;