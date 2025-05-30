import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api', //process.env.NEXT_PUBLIC_API_URL || 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
