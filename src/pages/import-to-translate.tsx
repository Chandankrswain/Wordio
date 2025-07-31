import { useState } from "react";
import { PiFileTextThin, PiTranslateThin } from "react-icons/pi";
import Tesseract from "tesseract.js";
import Header from "../components/header";
import MainButton from "../components/main-button";
import { LanguageData, TranslateData } from "../utils/api";
import DotDotLoading from "../components/dot-loading";

interface LanguageDataType {
  name: string;
  code: string;
}

const ImportToTextTranslate = () => {
  const [allLanguage, setAllLanguages] = useState<LanguageDataType[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [languageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("hi");
  const [selectedLanguageTo, setSelectedLanguageTo] = useState("Hindi");
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false); // OCR Loading
  const [languageLoading, setLanguageLoading] = useState(false); // Language dropdown loading
  const [translateLoading, setTranslateLoading] = useState(false); // Translation loading
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "uploaded"
  >("idle");

  const languageService = new LanguageData();
  const translator = new TranslateData();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadStatus("uploading");
      setTimeout(() => {
        setImage(files[0]);
        setUploadStatus("uploaded");
        setTimeout(() => setUploadStatus("idle"), 2000);
      }, 1000);
    }
  };

  const fetchLanguage = async () => {
    setLanguageLoading(true);
    try {
      const result = await languageService.fetchLanguages();
      setAllLanguages(result);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLanguageLoading(false);
    }
  };

  const extractText = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await Tesseract.recognize(image, "eng");
      setExtractedText(result.data.text);
    } catch (error) {
      console.error("OCR Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTranslateText = async (
    extractedText: string,
    fromLanguage: string,
    toLanguage: string
  ) => {
    setTranslateLoading(true);
    try {
      const result = await translator.postTranslate(
        extractedText,
        fromLanguage,
        toLanguage
      );
      setTranslatedText(result.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setTranslateLoading(false);
    }
  };

  const handleClick = () => {
    if (allLanguage.length > 0) {
      setAllLanguages([]);
    } else {
      fetchLanguage();
    }
  };

  const handleLanguageSelect = (code: string, name: string) => {
    setLanguageTo(code);
    setSelectedLanguageTo(name);
    setAllLanguages([]);
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200 relative">
      <Header
        icon={<PiFileTextThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="Import Translate"
      />

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Upload Status Toast */}
      {uploadStatus !== "idle" && (
        <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
          {uploadStatus === "uploading" ? "📤 Uploading..." : "✅ Uploaded!"}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap w-full justify-center gap-2">
        <MainButton
          onClick={extractText}
          className="rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7]"
          label={"Extract"}
          title="Extract Text Here"
        />
        <MainButton
          label={selectedLanguageTo || "Change to"}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7]"
          onClick={handleClick}
          title="Change Language"
        />
        <MainButton
          icon={<PiFileTextThin className="w-6 h-6" />}
          title="Upload Your File"
          className="w-15 p-3 h-full rounded-full border border-r-5 border-b-5 bg-[#f3f5f7]"
          onClick={() => document.getElementById("file-upload")?.click()}
        />
        <MainButton
          icon={<PiTranslateThin className="w-6 h-6" />}
          title="Translate Text"
          className="w-15 p-3 h-full rounded-full border border-r-5 border-b-5 bg-[#f3f5f7]"
          onClick={() =>
            fetchTranslateText(extractedText, languageFrom, languageTo)
          }
        />
      </div>

      {/* Language Dropdown */}
      <div
        className={`mt-2 px-4 z-20 ml-5 absolute h-[200px] w-[335px] overflow-y-auto top-50 bg-[#f3f5f7] rounded-4xl hide-scrollbar 
        transition-all duration-300 ease-in-out transform 
        ${
          allLanguage.length > 0 || languageLoading
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {languageLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotDotLoading />
          </div>
        ) : (
          allLanguage.map((lang, index) => (
            <button
              key={index}
              className="py-1 px-3 hover:bg-amber-200 rounded mb-1 text-center w-full text-lg"
              onClick={() => handleLanguageSelect(lang.code, lang.name)}
            >
              {lang.name}
            </button>
          ))
        )}
      </div>

      {/* OCR Loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 z-30">
          <DotDotLoading />
        </div>
      )}

      <div className="flex items-start items-center justify-center p-4">
        <div className="flex flex-col items-center ">
          {image && !loading && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Captured"
                className="w-20 h-24 rounded border"
              />
            </div>
          )}
          <p>File</p>
        </div>

        <div className="flex flex-col ml-4 w-full">
          <p className="font-display text-3xl font-medium mb-2">
            Extracted Text
          </p>
          {extractedText && !loading && (
            <p className="text-gray-900 w-full text-sm leading-6 ">
              {extractedText}
            </p>
          )}
        </div>
      </div>

      {/* Translation Loading or Result */}
      {translateLoading ? (
        <div className="flex justify-center items-center mt-6">
          <DotDotLoading />
        </div>
      ) : (
        translatedText && (
          <div className="text-gray-900 p-8 w-full">{translatedText}</div>
        )
      )}
    </div>
  );
};

export default ImportToTextTranslate;
