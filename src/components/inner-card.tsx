import { useState } from "react";
import Button from "./button";

interface WordInfo {
  word: string;
  phonetic: string;
  phonetics: Record<string, any>[];
  meanings?: Array<{
    partOfSpeech: string | null;
    definitions: Array<{ definition: string }>;
  }>;
}

interface InfoCardProps {
  wordMeaning: WordInfo | null;
}
const InnerCard = ({ wordMeaning }: InfoCardProps) => {
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<
    string | null
  >(null);

  const arrayOfPartsOfSpeech = [
    ...new Set(
      wordMeaning?.meanings?.map((m) => m.partOfSpeech).filter(Boolean)
    ),
  ];

  const handleClick = (partOfSpeech: string) => {
    setSelectedPartOfSpeech(partOfSpeech);
  };

  return (
    <div>
      <div className="flex flex-wrap ">
        {arrayOfPartsOfSpeech &&
          arrayOfPartsOfSpeech.map((partOfSpeech, index) => (
            <Button
              key={index}
              label={partOfSpeech ?? ""}
              onClick={() => handleClick(partOfSpeech ?? "")}
              className={`${
                selectedPartOfSpeech === partOfSpeech
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            />
          ))}
      </div>
      {wordMeaning &&
        (wordMeaning?.meanings ?? [])
          .filter((meaning) => selectedPartOfSpeech === meaning.partOfSpeech)
          .map((meaning: any, index: number) => (
            <li key={index}>
              <ul>
                {meaning.definitions?.map((def: any, i: number) => (
                  <li key={i}>{def.definition}</li>
                ))}
              </ul>
            </li>
          ))}
    </div>
  );
};

export default InnerCard;
