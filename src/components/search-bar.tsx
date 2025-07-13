import { useState } from "react";

import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [userWord, setUserWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  let navigate = useNavigate();

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(input.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserWord(inputValue);
    setInputValue("");
  };

  const handleSubmittion = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/${inputValue}`);
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="flex items-center pb-2">
        <input
          className=" p-3 pl-4 border rounded-3xl font-sans outline-none placeholder:text-black"
          type="text"
          placeholder="Enter a word or phrase"
          onChange={handleInput}
          value={inputValue}
        />
        <button className="p-2" type="submit" onClick={handleSubmittion}>
          <BsArrowRight className="w-13 h-13 border p-3 rounded-full" />
        </button>
      </form>
      {/* {!loading && wordData ? (
        <div>
          <p className="text-6xl font-bold">{wordData.word}</p>
          {wordData.phonetics?.[0]?.text && (
            <p>Phonetic: {wordData.phonetics[0].text}</p>
          )}
          <h3>Meanings:</h3>
          <ul>
            {wordData.meanings?.map((meaning: any, index: number) => (
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
      ) : (
        ""
      )} */}
    </div>
  );
};

export default SearchBar;
