import axios from "axios";

const api = axios.create({
  baseURL: "/", // points to public folder during dev; adjust as needed
  timeout: 10000,
});

export default api;
