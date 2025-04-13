"use client";

import { FC, ReactNode } from "react";
import { ImSpinner8 } from "react-icons/im";

export interface ButtonProps {
  type: "primary" | "secondary";
  isLoading?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  isLoading = false,
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2 font-semibold text-center rounded-lg text-md ease-in-out duration-300
				${!isLoading ? "duration-150 ease-in-out" : ""}
				${
          type === "primary"
            ? "bg-blue-dark border-2 border-white/20 hover:border-white/60 text-white"
            : ""
        }
				${
          type === "secondary"
            ? "hover:bg-blue-accent hover:border-blue-accent hover:text-blue-light bg-blue-dark text-white border border-white"
            : ""
        }
        ${
          disabled &&
          "border-white/20 bg-white/50 text-black hover:bg-white/50 disabled:cursor-not-allowed hover:border-white/20"
        }
				`}
      disabled={isLoading || disabled}
    >
      {isLoading && <ImSpinner8 className="animate-spin" size={24} />}
      {!isLoading && children && <span className="">{children}</span>}
    </button>
  );
};

export default Button;
