import apiClient from "../services/axios/dictionary-axios";
import apiClientLanguages from "../services/axios/language-axios";
import { WORD_SEARCH_API } from "../services/constants/ApiEndPoint";

export class WordData {
  client: any;
  constructor() {
    this.client = apiClient;
  }

  async fetchWordData(word: string) {
    const response = await this.client.get(
      WORD_SEARCH_API.replace(":WORD", word.toLowerCase())
    );
    return response.data;
  }
}

export class LanguageData {
  client: any;
  constructor() {
    this.client = apiClientLanguages;
  }

  async fetchLanguages() {
    const response = await this.client.get("/languages");
    return response.data;
  }
}
