import { useEffect, useState } from "react";
import { WordData } from "./utils/api";

function App() {
  const [wordData, setWordData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const data = new WordData();

  async function fetchWord(word: string) {
    try {
      setLoading(true);
      const result = await data.fetchWordData(word);
      setWordData(result[0]); // assuming API returns an array
    } catch (error) {
      console.error("Failed to fetch word data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWord("corny");
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {wordData ? (
        <div>
          <h2>Word: {wordData.word}</h2>
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
        <p>No data found.</p>
      )}
    </div>
  );
}

export default App;
