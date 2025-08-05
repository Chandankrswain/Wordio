import {
  PiArrowCounterClockwiseThin,
  PiCopySimpleThin,
  PiMicrophoneThin,
  PiSoundcloudLogoThin,
  PiVoicemailThin,
} from "react-icons/pi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { TranslateData } from "../utils/api";
import RoundedButton from "../components/rounded-button";

const VoiceToTextTranslate = () => {
  const [isListening, setIsListening] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const translator = new TranslateData();

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

  const handleCopyToClipboard = () => {
    if (translatedText || transcript) {
      navigator.clipboard
        .writeText(translatedText || transcript)
        .then(() => {
          alert("Translation copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    } else {
      alert("No translation available to copy.");
    }
  };

  const startListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      fetchTranslateText(transcript, "hi", "en");
    } else {
      setIsListening(true);
      SpeechRecognition.startListening({
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

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto justify-between bg-yellow-200">
      <Header
        icon={<PiVoicemailThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="VoiceText Translate"
      />

      <div className="flex flex-col items-center relative h-screen ">
        <div className=" text-gray-900 p-8 w-full h-[350px] bg-[#f3f5f7] rounded-tl-[120px] ">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center  w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">Hindi</p>
            </div>
            <div className="flex items-center space-x-3">
              <PiCopySimpleThin
                className="w-5 h-5"
                onClick={handleCopyToClipboard}
              />
              <PiArrowCounterClockwiseThin onClick={resetTranscript} />
            </div>
          </div>
          <p className="text-xl p-4 leading-12 overflow-auto ml-5 h-44 text-black">
            {isListening ? "Listening..." : transcript || "Speak something..."}
          </p>
        </div>

        <div className=" text-gray-900 p-8 w-full absolute top-64 bg-yellow-200 rounded-tl-[120px] ">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center  w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">English</p>
            </div>
            <PiCopySimpleThin
              className="w-5 h-5"
              onClick={handleCopyToClipboard}
            />
          </div>
          <p className="text-xl p-4 leading-12 overflow-auto ml-5 h-44 text-black">
            {translatedText || "Translation..."}
          </p>
        </div>
      </div>

      <p className="text-center text-xs mb-3 text-gray-600 z-40 ">
        Note : This Features only works in Google Chrome Browser (PC)
      </p>
      <div className="flex flex-col items-center justify-center mb-2 z-40">
        <RoundedButton
          icon={
            <PiMicrophoneThin className="w-10 h-10 m-2 cursor-pointer z-10 p-1" />
          }
          title={isListening ? "Stop Listening" : "Start Listening"}
          onClick={startListening}
        />
      </div>
    </div>
  );
};

export default VoiceToTextTranslate;
