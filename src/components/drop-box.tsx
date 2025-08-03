import { useState } from "react";
import { PiTrashFill } from "react-icons/pi";

interface DropBoxProps {
  file: File | null;
  setFile: (file: File | null) => void;
  innertext?: string;
  innersubtext?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const DropBox = ({
  file,
  setFile,
  innertext,
  innersubtext,
  icon,
}: DropBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(null);
      setTimeout(() => setFile(selectedFile), 0);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => setFile(null);

  return (
    <div className="flex flex-col items-center justify-center mb-4 w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-[90%] h-48 flex flex-col items-center justify-center border-2 ${
          file
            ? "border-gray-400 border-solid"
            : "border-dashed border-gray-400"
        } rounded-lg cursor-pointer transition ${
          isDragging ? "border-blue-500 bg-blue-50" : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          onClick={(e) => ((e.target as HTMLInputElement).value = "")}
        />

        {!file ? (
          <label htmlFor="file-upload" className="text-gray-500 cursor-pointer">
            <div className="flex flex-col items-center ">
              {icon}
              <p className="text-lg">{innertext}</p>
              <p className="text-sm text-gray-400">{innersubtext}</p>
            </div>
          </label>
        ) : (
          <div className="w-full h-full flex items-center justify-between px-6">
            <div className="flex items-center">
              <span className="text-lg font-medium">{file.name}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              <PiTrashFill className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropBox;
