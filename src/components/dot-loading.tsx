const DotDotLoading = () => {
  return (
    <div className="flex justify-center bg-tra items-center space-x-1 text-2xl font-bold text-gray-700">
      <span className="animate-bounce [animation-delay:0ms]">.</span>
      <span className="animate-bounce [animation-delay:200ms]">.</span>
      <span className="animate-bounce [animation-delay:400ms]">.</span>
    </div>
  );
};

export default DotDotLoading;
