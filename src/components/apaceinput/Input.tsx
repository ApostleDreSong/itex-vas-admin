import React, { InputHTMLAttributes } from "react";

const InputStyle = {
  padding: "15px",
  borderRadius: "5px",
  width: "100%",
  backgroundColor: "white",
};

export default function Input({
  style,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input style={{ ...InputStyle, ...style }} {...props} />;
}
