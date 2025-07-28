import HeadingButton from "./heading-button";
import logo from "../assets/logo.png";

interface Props {
  icon: React.ReactNode;
  text: string;
}

const Header = ({ icon, text }: Props) => {
  return (
    
    <div className="h-26 flex justify-between mb-2">
      <img
        src={logo}
        alt="Wordio Logo"
        className="w-44 h-10 ml-3 mt-8 mb-5"
        onClick={() => (window.location.href = "/")}
      />
      <HeadingButton icon={icon} label={text} />
    </div>
  );
};

export default Header;
