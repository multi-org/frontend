import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083",// Adjust the base URL as needed
   withCredentials: true, 

});

export default api;