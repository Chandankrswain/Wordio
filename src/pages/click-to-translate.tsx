import { useState } from "react";
import Header from "../components/header";
import { PiCameraThin, PiScanThin, PiTranslateThin } from "react-icons/pi";
import MainButton from "../components/main-button";
import { LanguageData, TranslateData } from "../utils/api";
import Tesseract from "tesseract.js";
import DropBox from "../components/drop-box";
import DotDotLoading from "../components/dot-loading";

interface LanguageDataType {
  name: string;
  code: string;
}

const ClickToTextTranslate = () => {
  const [allLanguage, setAllLanguages] = useState<LanguageDataType[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [languageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("hi");
  const [selectedLanguageTo, setSelectedLanguageTo] = useState("Hindi");
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const languageService = new LanguageData();
  const translator = new TranslateData();

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  console.log("Image:", image);

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
        icon={<PiScanThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="Import Translate"
      />

      <input
        id="capture-photo"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="hidden"
      />

      <DropBox
        file={image}
        setFile={setImage}
        innertext="Capture the photo"
        innersubtext="Click to open camera or upload an image"
        icon={<PiCameraThin className="w-8 h-8" />}
      />

      <MainButton
        onClick={extractText}
        className="rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7]"
        label={"Extract"}
      />

      {/* OCR Loading */}
      {loading && (
        <div className=" inset-0 flex items-center justify-center bg-opacity-30 z-30">
          <DotDotLoading />
        </div>
      )}
      <div className="flex items-end items-center justify-center">
        <div className="flex flex-col w-full p-5">
          <p className="font-display text-3xl font-bold  bg-[#f3f5f7] px-4 w-[90%] rounded-tr-3xl">
            Extracted Text
          </p>
          <p className="text-gray-900 w-full font-thin text-sm overflow-y-auto leading-6 h-40 p-5 hide-scrollbar rounded-tr-3xl   bg-yellow-100">
            {extractedText}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap w-full justify-center gap-2">
        <MainButton
          label={selectedLanguageTo || "Change to"}
          className="h-full rounded-4xl border border-r-5 border-b-5 bg-[#f3f5f7]"
          onClick={handleClick}
          title="Change Language"
        />
        <MainButton
          icon={<PiCameraThin className="w-6 h-6" />}
          title="Open Camera"
          className="w-15 p-3 h-full rounded-full border border-r-5 border-b-5 bg-[#f3f5f7]"
          onClick={() => document.getElementById("capture-photo")?.click()}
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
      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="Captured"
            className="w-16 h-24 mt-2 rounded border "
          />
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

export default ClickToTextTranslate;
