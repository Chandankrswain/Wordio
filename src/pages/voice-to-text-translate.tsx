import {
  PiArrowCounterClockwiseThin,
  PiCopySimpleThin,
  PiMicrophoneThin,
  PiSoundcloudLogoThin,
  PiVoicemailThin,
} from "react-icons/pi";
import Header from "../components/header";
import { useEffect, useState, useRef } from "react";
import { TranslateData } from "../utils/api";
import RoundedButton from "../components/rounded-button";

const VoiceToTextTranslate = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcriptedText, setTranscriptedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const translator = new TranslateData();

  useEffect(() => {
    const Recognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = "hi";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let liveTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        liveTranscript += event.results[i][0].transcript + " ";
      }
      setTranscriptedText(liveTranscript.trim());
      fetchTranslateText(liveTranscript.trim(), "hi", "en");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Automatically stop listening state when session ends
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Mic permission granted"))
      .catch(() => alert("Please enable microphone access"));
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const fetchTranslateText = async (
    text: string,
    fromLang: string,
    toLang: string
  ) => {
    if (!text.trim()) return;
    try {
      const result = await translator.postTranslate(text, fromLang, toLang);
      setTranslatedText(result.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = translatedText || transcriptedText;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Copied to clipboard!");
      });
    }
  };

  const handleReset = () => {
    setTranscriptedText("");
    setTranslatedText("");
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto justify-between bg-yellow-200">
      <Header
        icon={<PiVoicemailThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="VoiceText Translate"
      />

      <div className="flex flex-col items-center relative h-screen ">
        {/* Original Speech Box */}
        <div className=" text-gray-900 p-8 w-full h-[350px] bg-[#f3f5f7] rounded-tl-[120px] ">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">Hindi</p>
            </div>
            <div className="flex items-center space-x-3">
              <PiCopySimpleThin
                className="w-5 h-5"
                onClick={handleCopyToClipboard}
              />
              <PiArrowCounterClockwiseThin onClick={handleReset} />
            </div>
          </div>
          <p className="text-xl p-4 leading-12 overflow-auto ml-5 h-44 text-black">
            {isListening
              ? transcriptedText || "Listening..."
              : transcriptedText || "Speak Something..."}
          </p>
        </div>

        {/* Translation Box */}
        <div className=" text-gray-900 p-8 w-full absolute top-64 bg-yellow-200 rounded-tl-[120px] ">
          <div className="flex justify-between mt-4 items-center">
            <div className="flex items-center w-[60%]">
              <PiSoundcloudLogoThin className="w-8 h-8 ml-8" />
              <p className="ml-3">English</p>
            </div>
            <div className="flex items-center space-x-3">
              <PiCopySimpleThin
                className="w-5 h-5"
                onClick={handleCopyToClipboard}
              />
              <PiArrowCounterClockwiseThin onClick={handleReset} />
            </div>
          </div>
          <p className="text-xl p-4 leading-12 overflow-auto ml-5 h-44 text-black">
            {translatedText || "Translation....."}
          </p>
        </div>
      </div>

      <p className="text-center text-xs mb-3 text-gray-600 z-40 ">
        Note: This works best in Google Chrome.
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
