const TextBox = () => {
  return (
    <textarea
      placeholder="Enter text to translate..."
      className="w-full h-44 max-w-3xl p-4 resize-none text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
    />
  );
};

export default TextBox;
