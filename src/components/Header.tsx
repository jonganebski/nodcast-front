import React from "react";

export const Header = () => {
  return (
    <header className="py-2 flex justify-center">
      <input
        className=" mx-2 p-3 outline-none bg-gray-100 w-full max-w-screen-md rounded-md focus:shadow-md focus:bg-white transition-all"
        placeholder="Search podcast"
      />
    </header>
  );
};
