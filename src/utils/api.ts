import apiClient from "../services/axios";
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
