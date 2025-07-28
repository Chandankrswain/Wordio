import { PiMicrophoneThin, PiVoicemailThin } from "react-icons/pi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "../components/header";
import { useEffect, useState } from "react";
import HeadingButton from "../components/heading-button";
import { TranslateData } from "../utils/api";

const VoiceToTextTranslate = () => {
  const [isListening, setIsListening] = useState(false);
  const translator = new TranslateData();
  const [translatedText, setTranslatedText] = useState("");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Mic permission granted"))
      .catch(() => alert("Please enable microphone access"));
  }, []);

  useEffect(() => {
    console.log("Transcript updated:", transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const startListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: "hi-IN",
      });
    }
  };

  const fetchTranslateText = async (
    textBoxContent: string,
    languageFrom: string,
    languageTo: string
  ) => {
    try {
      const result = await translator.postTranslate(
        textBoxContent,
        languageFrom,
        languageTo
      );
      setTranslatedText(result.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  useEffect(() => {
    if (transcript.trim()) {
      fetchTranslateText(transcript, "en", "hi");
    } else {
      setTranslatedText("");
    }
  }, [transcript]);

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      <Header
        icon={<PiVoicemailThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="VoiceText Translate"
      />

      <HeadingButton
        icon={
          <PiMicrophoneThin className="w-10 h-10 m-2 cursor-pointer z-10" />
        }
        label={isListening ? "Listening..." : ""}
        onClick={startListening}
      />

      <p className="p-4">{transcript || "🎙 Speak something..."}</p>
      <button onClick={resetTranscript} className="p-2 bg-gray-200">
        Reset
      </button>
      <div>{translatedText}</div>
    </div>
  );
};

export default VoiceToTextTranslate;
