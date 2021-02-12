import React, { ReactNode } from "react";

interface IAvatarProps {
  src: string;
  username: string;
  size?: number;
  className?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Avatar: React.FC<IAvatarProps> = ({
  src,
  username,
  size = 11,
  className,
  onClick,
  children,
}) => {
  return (
    <div className={`relative cursor-pointer ${className}`} onClick={onClick}>
      <div
        className={`w-${size} h-${size} rounded-full flex items-center justify-center bg-gray-600 overflow-hidden`}
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
