interface ButtonProps {
  label: string;
  onClick: (partOfSpeech: string) => void;
  className?: string;
}
const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        className=" border p-1 pl-4 pr-4 rounded-2xl m-2 ml-0"
        onClick={() => props.onClick(props.label)}
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
