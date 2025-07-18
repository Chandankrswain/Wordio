const VoiceRecording = () => {
  return (
    <div>
      <div className="flex items-end gap-1 h-20">
        <div className="w-1 bg-blue-500 animate-pulse-bar [animation-delay:-0.4s]"></div>
        <div className="w-1 bg-blue-500 animate-pulse-bar [animation-delay:-0.2s]"></div>
        <div className="w-1 bg-blue-500 animate-pulse-bar [animation-delay:0s]"></div>
        <div className="w-1 bg-blue-500 animate-pulse-bar [animation-delay:0.2s]"></div>
        <div className="w-1 bg-blue-500 animate-pulse-bar [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default VoiceRecording;
