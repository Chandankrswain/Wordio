import apiClient from "../services/axios/dictionary-axios";
import apiClientLanguages from "../services/axios/language-axios";
import apiClientTranslate from "../services/axios/translate-axios";
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

export class TranslateData {
  client: any;
  constructor() {
    this.client = apiClientTranslate;
  }

  async postTranslate(text: string, from: string, to: string) {
    try {
      const response = await this.client.get("/get", {
        params: {
          q: text,
          langpair: `${from}|${to}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Translation failed:", error);
      throw error;
    }
  }
}
