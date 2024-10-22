import axios from 'axios';

axios.defaults.baseURL = process.env.API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:4000',
});

export default api;
