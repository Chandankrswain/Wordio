interface FeatureButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

const FeatureButton = ({ icon, label, onClick }: FeatureButtonProps) => {
  return (
    <div
      className="border border-r-5 border-b-5 rounded-[40px] w-[40vw] max-w-[100px] h-[100px] 
             flex flex-col items-center justify-center mt-2 
             active:translate-x-[2px] active:translate-y-[2px] 
             active:border-r-2 active:border-b-2 
             transition-transform duration-100 ease-in-out"
    >
      <button className="mb-2" onClick={onClick}>
        {icon}
      </button>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default FeatureButton;
