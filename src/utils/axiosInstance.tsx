import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
