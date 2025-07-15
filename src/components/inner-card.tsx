import { useEffect, useState } from "react";
import Button from "./button";

interface WordInfo {
  word: string;
  phonetic: string;
  phonetics: Record<string, any>[];
  meanings?: Array<{
    partOfSpeech: string | null;
    definitions: Array<{ definition: string }>;
    examples?: string[];
  }>;
}

interface InfoCardProps {
  wordMeaning: WordInfo | null;
}
const InnerCard = ({ wordMeaning }: InfoCardProps) => {
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (wordMeaning?.meanings && wordMeaning.meanings.length > 0) {
      const noun = wordMeaning.meanings.find((m) => m.partOfSpeech === "noun");
      setSelectedPartOfSpeech(
        noun?.partOfSpeech ?? wordMeaning.meanings[0].partOfSpeech ?? null
      );
    }
  }, [wordMeaning]);

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
      <div className="flex flex-wrap mt-2">
        {arrayOfPartsOfSpeech &&
          arrayOfPartsOfSpeech.map((partOfSpeech, index) => (
            <Button
              key={index}
              label={partOfSpeech ?? ""}
              onClick={() => handleClick(partOfSpeech ?? "")}
              className={`border p-1 pl-4 pr-4 rounded-2xl m-2 ml-0 ${
                selectedPartOfSpeech === partOfSpeech
                  ? "border-black text-black"
                  : "text-gray-500 border-gray-500"
              }`}
            />
          ))}
      </div>
      {wordMeaning &&
        (wordMeaning?.meanings ?? [])
          .filter((meaning) => selectedPartOfSpeech === meaning.partOfSpeech)
          .map((meaning: any, index: number) => (
            <li key={index} className="list-none mt-4">
              <ul className="list-disc ml-6">
                {meaning.definitions?.map((def: any, i: number) => (
                  <li className="leading-7 text-lg mb-3" key={i}>
                    <div>{def.definition}</div>
                    {def.example && (
                      <p className="text-sm text-gray-600 mt-1 ml-4">
                        Example: <em>“{def.example}”</em>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
    </div>
  );
};

export default InnerCard;
