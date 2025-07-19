import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://libretranslate.com/language",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
