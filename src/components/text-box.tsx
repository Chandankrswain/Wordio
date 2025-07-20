interface Props {
  className: string;
  placeholder: string;
}

const TextBox = ({ placeholder, className }: Props) => {
  return <textarea placeholder={placeholder} className={className} />;
};
export default TextBox;
