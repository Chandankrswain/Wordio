import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://libretranslate.com/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
