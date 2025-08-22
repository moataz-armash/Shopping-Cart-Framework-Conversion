import { forwardRef } from "react";

interface InputFields extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}
const InputField = forwardRef<HTMLInputElement, InputFields>(
  ({ type, placeholder, value, id, className = "", ...rest }, ref) => {
    return (
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder ? `Enter User ${placeholder}` : ""}
        ref={ref}
        className={`font-cursive m-auto w-[80%] px-2 outline-none ${className}`}
        {...rest}
      />
    );
  },
);

export default InputField;
