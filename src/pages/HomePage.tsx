import SearchBar from "../components/search-bar";

const HomePage = () => {
  return (
    <div className="flex flex-col md:w-[40%] mx-auto justify-between h-screen p-2 bg-yellow-500">
      <h1>Wordio</h1>
      <SearchBar />
    </div>
  );
};

export default HomePage;
