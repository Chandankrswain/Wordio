import { useState } from "react";
import { PiFileTextThin, PiTranslateThin } from "react-icons/pi";
import Tesseract from "tesseract.js";
import Header from "../components/header";
import MainButton from "../components/main-button";
import { LanguageData, TranslateData } from "../utils/api";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const result = await languageService.fetchLanguages();
      setAllLanguages(result);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
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
    try {
      const result = await translator.postTranslate(
        extractedText,
        fromLanguage,
        toLanguage
      );
      setTranslatedText(result.responseData.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };
  const handleClick = () => {
    fetchLanguage();
  };

  const handleLanguageSelect = (code: string, name: string) => {
    setLanguageTo(code);
    setSelectedLanguageTo(name);
    setAllLanguages([]);
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
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

      <p>
        {uploadStatus !== "idle" && (
          <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            {uploadStatus === "uploading" ? "📤 Uploading..." : "✅ Uploaded!"}
          </div>
        )}
      </p>
      <div className="flex flex-wrap w-full justify-center mb-6 gap-2 items-stretch z-40">
        <MainButton
          onClick={extractText}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7] [30%]  "
          label={"Extract"}
        />

        <MainButton
          label={selectedLanguageTo || "Change to"}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7] [30%]  "
          onClick={() => handleClick()}
        />

        <MainButton
          icon={<PiFileTextThin className="w-6 h-6 " />}
          className="w-15 p-3 h-full rounded-full border border-r-5 border-b-5 bg-[#f3f5f7] hover:bg-gray-100 transition-all duration-200"
          onClick={() => document.getElementById("file-upload")?.click()}
        />
        <MainButton
          icon={<PiTranslateThin className="w-6 h-6" />}
          className="w-15 p-3 h-full rounded-full mr-3 border border-r-5 border-b-5 bg-[#f3f5f7] hover:bg-gray-100 transition-all duration-200"
          onClick={() =>
            fetchTranslateText(extractedText, languageFrom, languageTo)
          }
        />
      </div>
      {(allLanguage.length > 0 || loading) && (
        <div className="mt-2 px-4 z-20">
          {loading ? (
            <p className="text-sm text-gray-700">Loading languages...</p>
          ) : (
            allLanguage.map((lang, index) => (
              <button
                key={index}
                className="py-1 px-3 bg-white hover:bg-gray-100 rounded mb-1 text-left w-full "
                onClick={() => handleLanguageSelect(lang.code, lang.name)}
              >
                {lang.name}
              </button>
            ))
          )}
        </div>
      )}
      {loading && <p className="mt-2">Extracting text...</p>}
      {extractedText && (
        <p className="text-gray-900 p-8 w-fulltop-70">{extractedText}</p>
      )}

      {translatedText && (
        <div className="text-gray-900 p-8 w-fulltop-70">{translatedText}</div>
      )}
    </div>
  );
};
export default ImportToTextTranslate;
