import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  timeout: 1000,
});

export default apiClient;
