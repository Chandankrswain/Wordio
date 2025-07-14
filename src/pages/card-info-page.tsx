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
    <div className="">
      {isLoading && <p>Loading...</p>}
      <ul>
        {wordInfo?.meanings?.map((meaning: any, index: number) => (
          <li key={index}>
            <strong>{meaning.partOfSpeech}</strong>
            <ul>
              {meaning.definitions?.map((def: any, i: number) => (
                <li key={i}>{def.definition}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;
