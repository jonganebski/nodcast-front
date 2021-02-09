import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  active?: boolean;
  icon?: IconDefinition;
  activeIcon?: IconDefinition;
  activeText?: string;
  loading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  text,
  onClick,
  disabled = false,
  active = false,
  icon,
  activeIcon,
  activeText,
  loading = false,
}) => {
  return (
    <button
      className={`border rounded-full py-1 px-3 mt-2 text-sm focus:outline-none font-semibold ${
        active
          ? "hover:bg-blue-100 active:bg-blue-300 bg-blue-200 text-blue-600"
          : "hover:bg-gray-50 active:bg-gray-200 text-gray-600"
      } ${disabled && "opacity-60"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!active && icon && (
        <FontAwesomeIcon className="mr-2 text-blue-500" icon={icon} />
      )}
      {active && activeIcon && (
        <FontAwesomeIcon className="mr-2 text-blue-500" icon={activeIcon} />
      )}
      {loading ? (
        <div className="loading-indicator">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : active ? (
        activeText
      ) : (
        text
      )}
    </button>
  );
};
