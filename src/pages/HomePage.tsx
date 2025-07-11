import SearchBar from "../components/search-bar";
import logo from "../assets/logo.png";
import background from "../assets/background.png";

const HomePage = () => {
  return (
    <div
      className="flex flex-col md:w-[40%] mx-auto justify-between h-screen p-2 bg-yellow-500"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "490px auto", // You can change this to any size you want
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
      }}
    >
      <img src={logo} alt="Wordio Logo" className="w-44 h-10 ml-2 mt-6" />
      <div className="flex flex-col p-2">
        <p className="text-[100px] font-bold leading-22 font-display">Search</p>
        <p className="text-[85px] font-bold leading-22 font-display">Word.</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
