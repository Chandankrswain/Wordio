import axios from "axios";

const apiClientLanguages = axios.create({
  baseURL: "https://libretranslate.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClientLanguages;
