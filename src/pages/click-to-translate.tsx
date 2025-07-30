import { useState } from "react";
import Header from "../components/header";
import { PiScanThin } from "react-icons/pi";

const ClickToTextTranslate = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file); // Create preview URL
      setCapturedImage(imageURL);
    }
  };

  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      <Header
        icon={<PiScanThin className="w-7 h-7 m-2 cursor-pointer z-10" />}
        text="Import Translate"
      />

      <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
        Open Camera
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
        />
      </label>

      {/* Captured Image Preview */}
      {capturedImage && (
        <div>
          <h3 className="text-lg font-bold mt-4">Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-64 mt-2 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ClickToTextTranslate;
