import SearchBar from "../components/search-bar";
import logo from "../assets/logo.png";

const HomePage = () => {
  return (
    <div className="flex flex-col md:w-[40%] mx-auto justify-between h-screen p-2 bg-yellow-500">
      <img src={logo} alt="Wordio Logo" className="w-44 h-10 ml-2 mt-6" />
      <div className="flex flex-col">
        <p className="text-[80px] font-bold leading-20 font-display">Search</p>
        <p className="text-[40px] font-bold leading-20 font-display">Word.</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
