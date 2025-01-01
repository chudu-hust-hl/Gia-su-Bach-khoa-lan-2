import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  primary?: boolean;
  small?: boolean;
  large?: boolean;
}

export default function Button({
  className,
  primary,
  small,
  large,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${
        primary ? "bg-primary text-white hover:-translate-y-1 hover:scale-110 hover:bg-[#AD493A] duration-300" : "bg-secondary"
      } text-base font-medium rounded-lg ${
        large ? "px-6 py-3.5" : small ? "px-3 py-[7px]" : "px-6 py-2.5"
      } disabled:opacity-50 ${className ?? ""}`}
      {...props}
    />
  );
}
