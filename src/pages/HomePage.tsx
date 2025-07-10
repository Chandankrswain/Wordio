import SearchBar from "../components/search-bar";
import logo from "../assets/logo.png";

const HomePage = () => {
  return (
    <div className="flex flex-col md:w-[40%] mx-auto justify-between h-screen p-2 bg-yellow-500">
      <img src={logo} alt="Wordio Logo" className="w-[160px] h-[160px]" />
      <div>
        <p className="text-[80px] font-bold leading-20">Search Here</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
