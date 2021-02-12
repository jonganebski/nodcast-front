import React, { ReactNode } from "react";
import { meQuery_me } from "../__generated__/meQuery";

interface IAvatarProps {
  me: meQuery_me | undefined;
  src: string;
  size?: number;
  className?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Avatar: React.FC<IAvatarProps> = ({
  me,
  src,
  size = 9,
  className,
  onClick,
  children,
}) => {
  return (
    <div
      className={`relative w-${size} h-${size} rounded-full flex items-center justify-center bg-gray-600 cursor-pointer overflow-hidden ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt="User avatar"
        />
      ) : (
        <span className="text-white">{me?.username[0].toUpperCase()}</span>
      )}
      {children}
    </div>
  );
};
