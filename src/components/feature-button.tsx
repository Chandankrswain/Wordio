interface FeatureButtonProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureButton = ({ icon, label }: FeatureButtonProps) => {
  return (
    <div className="border border-r-4 border-b-4 rounded-[40px] w-[40vw] max-w-[100px] h-[100px] flex flex-col items-center justify-center hover:border-yellow-500 transition duration-200 ease-in-out mt-2 ">
      <button className="mb-2">{icon}</button>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default FeatureButton;
