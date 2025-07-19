import TextBox from "../components/text-box";

interface TextBoxProps {
  className: string;
}

const TextToTextTranslate = ({ className }: TextBoxProps) => {
  return (
    <div className="flex flex-col md:w-[40%] mx-auto h-screen overflow-y-auto bg-yellow-200">
      <TextBox />
    </div>
  );
};

export default TextToTextTranslate;
