import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
