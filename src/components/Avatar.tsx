import React, { ReactNode } from "react";

interface IAvatarProps {
  src: string;
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Avatar: React.FC<IAvatarProps> = ({
  src,
  username,
  size = "md",
  className,
  onClick,
  children,
}) => {
  return (
    <div className={`relative cursor-pointer ${className}`} onClick={onClick}>
      <div
        className={`rounded-full flex items-center justify-center bg-gray-600 overflow-hidden ${
          size === "sm" ? "w-6 h-6" : size === "md" ? "w-9 h-9" : "w-14 h-14"
        }`}
      >
        {src ? (
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="User avatar"
          />
        ) : (
          <span className="text-white">{username[0]?.toUpperCase()}</span>
        )}
      </div>
      {children}
    </div>
  );
};
