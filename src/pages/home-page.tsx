import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import FeatureButton from "../components/feature-button";
import SearchBar from "../components/search-bar";
import {
  PiDownloadSimpleThin,
  PiScanThin,
  PiTextAaThin,
  PiVoicemailThin,
} from "react-icons/pi";

const HomePage = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  const navigate = useNavigate();

  const features = [
    {
      icon: <PiVoicemailThin className="w-10 h-10" />,
      label: "Voice",
      handleClick: () => {
        navigate("/voice-to-text-translate");
      },
    },
    {
      icon: <PiTextAaThin className="w-10 h-10" />,
      label: "Text",
      handleClick: () => {
        navigate("/text-to-text-translate");
      },
    },
    {
      icon: <PiScanThin className="w-10 h-10" />,
      label: "Camera",
      handleClick: () => {
        navigate("/click-to-text-translate");
      },
    },
    {
      icon: <PiDownloadSimpleThin className="w-10 h-10" />,
      label: "Import",
      handleClick: () => {
        navigate("/import-to-text-translate");
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col md:w-[40%] mx-auto h-screen bg-yellow-200 ">
        <div className="flex flex-col bg-yellow-200 w-[80%] h-[70%] rounded-br-2xl -z-0 p-2 ">
          <img
            src={logo}
            alt="Wordio Logo"
            className="w-44 h-10 ml-2 mt-6 mb-5"
            onClick={handleClick}
          />
          <div className="p-4 flex flex-col h-[60%] justify-between">
            <p className="text-[20px] font-display">Hello</p>
            <p className="text-[35px] font-display">
              What can I find and translate for you today?
            </p>
          </div>
          <SearchBar />
        </div>
        <div className="h-[60%] rounded-tl-[120px] bg-[#F4F5F7] px-6 pt-7 z-2 relative">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start ">
            {features.map((feature, index) => (
              <FeatureButton
                key={index}
                icon={feature.icon}
                label={feature.label}
                onClick={feature.handleClick}
              />
            ))}
            <div className="absolute rotate-90 bottom-20 right-[-14px] bg-yellow-200 p-2 pl-4 pr-4 rounded-lg  ">
              Extra
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
