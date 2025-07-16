interface FeatureButtonProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureButton = ({ icon, label }: FeatureButtonProps) => {
  return (
    <div className="border border-gray-300 rounded-[35px] w-[120px] h-[120px] flex flex-col items-center justify-center hover:border-black transition-colors duration-200 cursor-pointer">
      <button className="mb-2">{icon}</button>
      <p className="text-sm ">{label}</p>
    </div>
  );
};

export default FeatureButton;
