import React from "react";

interface IButtonWideProps {
  text: string;
  loading: boolean;
  disabled: boolean;
}

export const ButtonWide: React.FC<IButtonWideProps> = ({
  text,
  loading,
  disabled,
}) => {
  return (
    <button
      className={`w-full py-4 border text-gray-900 ${
        disabled ? "bg-gray-900" : "bg-white hover:border-gray-900"
      }`}
      style={{ transition: "background-color 1s ease-in-out" }}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="relative">
          <span role="img" aria-label="heart" className="absolute animate-ping">
            ❤
          </span>
          <span role="img" aria-label="heart">
            ❤
          </span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};
