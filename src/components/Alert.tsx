import React, { useEffect, useRef } from "react";

interface IAlertProps {
  text: string;
  actionText: string;
  actionLoading: boolean;
  cancelCallBack: () => void;
  actionCallBack: () => Promise<void>;
}

export const Alert: React.FC<IAlertProps> = ({
  text,
  actionText,
  actionLoading,
  cancelCallBack,
  actionCallBack,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bg-gray-700 w-full h-full transition-all duration-500 ${
          true ? "opacity-40 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        onClick={cancelCallBack}
      />
      <section className="fixed z-20 top-48 left-1/2 transform -translate-x-1/2 max-w-sm bg-white p-4 rounded-lg shadow-2xl border border-red-500">
        <div className="mb-2 flex justify-center">
          <span className="text-4xl" role="img">
            🚨
          </span>
        </div>
        <h1 className="mb-4 font-semibold">{text}</h1>
        <div className="mb-7">
          <p>This action cannot be reverted.</p>
          <p>Are you sure?</p>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="border border-gray-300 px-3 py-2 rounded-md mr-7 hover:border-gray-500"
            onClick={cancelCallBack}
            disabled={actionLoading}
            ref={cancelRef}
          >
            Cancel
          </button>
          <button
            className="border px-3 py-2 rounded-md bg-red-700 text-gray-50 hover:bg-red-600"
            onClick={actionCallBack}
            disabled={actionLoading}
          >
            {actionLoading ? "Please wait..." : actionText}
          </button>
        </div>
      </section>
    </>
  );
};
