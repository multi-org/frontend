import axios from "axios";

const api = axios.create({
  //baseURL: "http://77.37.43.4:8083/",
  // baseURL: "http://localhost:8083",
  baseURL: "/api",
  withCredentials: true, 

});

export default api;