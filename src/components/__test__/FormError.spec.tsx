import { render } from "@testing-library/react";
import React from "react";
import { FormError } from "../FormError";

const TEST_ERR = "test err";

describe("<FormError />", () => {
  it("renders OK with props", () => {
    const { getByText } = render(<FormError err={TEST_ERR} />);
    getByText(TEST_ERR);
  });
});
