import React from "react";

interface TextBoxProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextBox;
