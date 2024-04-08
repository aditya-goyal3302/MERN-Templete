import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL, 
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
