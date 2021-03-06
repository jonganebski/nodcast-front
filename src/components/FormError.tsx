import React from "react";

interface IFormErrorProps {
  err?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ err }) => (
  <span role="alert" className="text-sm text-red-600">
    {err}
  </span>
);
