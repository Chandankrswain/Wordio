import { useEffect, useState } from "react";
import { WordData } from "../utils/api";
import { useParams } from "react-router";
import { PiSpeakerSimpleHighLight } from "react-icons/pi";
import logo from "../assets/logo.png";
import InnerCard from "../components/inner-card";

interface WordInfo {
  word: string;
  phonetic: string;
  phonetics: Record<string, any>[];
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

  const handleClick = () => {
    window.location.href = "/";
  };

  const handlePronunciation = () => {
    const audioUrl = wordInfo?.phonetics?.[0]?.audio;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      console.warn("No audio available for this word");
    }
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto p-7 bg-yellow-200">
      <img
        src={logo}
        alt="Wordio Logo"
        className="w-44 h-10 ml-2 mt-6"
        onClick={handleClick}
      />
      {isLoading && <p>Loading...</p>}
      {wordInfo ? (
        <div className="flex flex-col mt-20 p-4 ">
          <p className="text-xs ml-1 leading-0 font-light font-[#a7abaf]">
            VERB
          </p>
          <p className="font-bold font-display text-5xl mb-2">
            {wordInfo.word}
          </p>
          <div className="flex items-center">
            <button onClick={handlePronunciation}>
              <PiSpeakerSimpleHighLight className="w-7 h-7 mr-3" />
            </button>
            <p className="text-2xl mb-2">{wordInfo.phonetic}</p>
          </div>
          <InnerCard wordMeaning={wordInfo} />
        </div>
      ) : (
        "No word found!"
      )}
    </div>
  );
};

export default InfoCard;
