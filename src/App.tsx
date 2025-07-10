import SearchBar from "./components/search-bar";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen w-[40%] mx-6 sm:mx-auto md:mx-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Wordio</h1>
      <SearchBar />
    </div>
  );
}

export default App;
