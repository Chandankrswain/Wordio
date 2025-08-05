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

    if (!Recognition) {
      alert("Speech recognition is not supported on this device/browser.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "hi-IN"; // Hindi (India)
    recognition.continuous = false; // Mobile-friendly (restart manually)
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setTranscriptedText(transcript.trim());

      // Convert Hinglish → Hindi Script, then Hindi → English
      fetchTranslateText(transcript.trim(), "hi", "en");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      if (isListening) {
        recognition.start(); // Restart listening for continuous effect
      }
    };

    recognitionRef.current = recognition;

    // Request mic permission
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Mic permission granted"))
      .catch(() => alert("Please enable microphone access"));
  }, [isListening]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
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
      // Step 1: Convert Hinglish to Hindi script
      const hindiResult = await translator.postTranslate(text, "hi", "hi");

      // Step 2: Convert Hindi script to English
      const englishResult = await translator.postTranslate(
        hindiResult.responseData.translatedText,
        fromLang,
        toLang
      );

      setTranslatedText(englishResult.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = translatedText || transcriptedText;
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => alert("Copied to clipboard!"));
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

      <div className="flex flex-col items-center relative h-screen">
        {/* Original Speech Box */}
        <div className="text-gray-900 p-8 w-full h-[350px] bg-[#f3f5f7] rounded-tl-[120px]">
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
        <div className="text-gray-900 p-8 w-full absolute top-64 bg-yellow-200 rounded-tl-[120px]">
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

      <p className="text-center text-xs mb-3 text-gray-600 z-40">
        Note: This works best in Google Chrome (Desktop & Mobile).
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
