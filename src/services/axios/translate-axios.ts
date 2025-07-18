import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.mymemory.translated.net/get",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
