import { useEffect, useState } from "react";
import { WordData } from "../utils/api";
import { useParams } from "react-router";

interface WordInfo {
  word: string;
  definition: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
    }[];
  }[];
  phonetics: {
    text: string;
  }[];
}

const InfoCard = () => {
  const data = new WordData();
  const [isLoading, setLoading] = useState(false);
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const params = useParams();

  async function fetchWord(word: string) {
    try {
      setLoading(true);
      const result = await data.fetchWordData(word);
      setWordInfo(result[0]);
      console.log("Word data fetched:", result[0]);
    } catch (error) {
      console.error("Failed to fetch word data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.word) {
      fetchWord(params.word);
    }
  }, [params.word]);

  return (
    <div className="flex flex-col md:w-[40%] mx-auto justify-between h-screen p-2 bg-[#6EE679]">
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InfoCard;
