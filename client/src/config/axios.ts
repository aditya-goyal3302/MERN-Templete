import axios from "axios";
const token = localStorage.getItem('token');
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": token // Include token in Authorization header
  }
});

export default axiosInstance;