"use client";

import { FC, ReactNode } from "react";
import { ImSpinner8 } from "react-icons/im";

export interface ButtonProps {
  type: "primary" | "secondary" | "accent";
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
      className={`w-full p-2 md:px-3 md:py-2 font-semibold text-center rounded-lg text-sm md:text-md ease-in-out duration-300
				${!isLoading ? "duration-150 ease-in-out" : ""}
				${
          type === "primary"
            ? "bg-blue-light border-2 border-white/20 hover:border-white/60 text-white"
            : ""
        }
				${
          type === "secondary"
            ? "font-bold hover:bg-blue-dark bg-blue-light text-white border border-blue-light"
            : ""
        }
        ${
          type === "accent"
            ? "bg-blue-dark border-2 border-white/20 hover:border-blue-accent text-white"
            : ""
        }
        ${
          disabled &&
          "bg-white/50 disabled:cursor-not-allowed border-blue-dark text-blue-dark"
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
