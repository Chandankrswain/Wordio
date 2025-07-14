import { useState } from "react";

interface WordInfo {
  word: string;
  phonetic: string;
  phonetics: Record<string, any>[];
  meanings?: Array<{
    partOfSpeech: string;
    definitions: Array<{ definition: string }>;
  }>;
}

interface InfoCardProps {
  wordMeaning: WordInfo | null;
}
const InnerCard = ({ wordMeaning }: InfoCardProps) => {
  return (
    <div>
      {wordMeaning &&
        wordMeaning.meanings?.map((meaning: any, index: number) => (
          <li key={index}>
            <strong>{meaning.partOfSpeech}</strong>
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
