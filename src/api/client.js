import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically add the token to headers if it exists in localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("kaffa_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
