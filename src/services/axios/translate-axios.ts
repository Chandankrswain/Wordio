import axios from "axios";

const apiClientTranslate = axios.create({
  baseURL: "https://api.mymemory.translated.net",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClientTranslate;
