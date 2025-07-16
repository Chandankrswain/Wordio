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

  const features = [
    {
      icon: <PiVoicemailThin className="w-12 h-12" />,
      label: "Voice",
    },
    {
      icon: <PiTextAaThin className="w-12 h-12" />,
      label: "Text",
    },
    {
      icon: <PiScanThin className="w-12 h-12" />,
      label: "Camera",
    },
    {
      icon: <PiDownloadSimpleThin className="w-12 h-12" />,
      label: "Import",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:w-[40%] mx-auto h-screen bg-yellow-200 ">
        <div className="flex flex-col bg-yellow-200 w-[80%] h-[70%] rounded-br-2xl -z-0 p-2 ">
          <img
            src={logo}
            alt="Wordio Logo"
            className="w-44 h-10 ml-2 mt-6 mb-14"
            onClick={handleClick}
          />
          <div className="p-4 flex flex-col h-[50%] justify-between">
            <p className="text-[28px] font-display">Hello</p>
            <p className="text-[35px] font-display">
              What can I find and translate for you today?
            </p>
          </div>
          <SearchBar />
        </div>
        <div className="h-[60%] rounded-tl-[170px] bg-[#F4F5F7] pl-20 pt-20 z-2">
          <div className="flex flex-wrap gap-10 justify-start">
            {features.map((feature, index) => (
              <FeatureButton
                key={index}
                icon={feature.icon}
                label={feature.label}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
