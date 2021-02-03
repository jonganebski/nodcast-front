import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { AUTH_FORM } from "../../constants";
import { createAccountMutationVariables } from "../../__generated__/createAccountMutation";
import { UserRole } from "../../__generated__/globalTypes";
import {
  Auth,
  CREATE_ACCOUNT_MUTATION,
  IAuthFormProps,
  LOG_IN_MUTATION,
} from "../Auth";

// =============================================
// Constants
// =============================================

const PASSWORD = "testyMocky";
const MUTATION_ERR = "Mutation error";

const formData: IAuthFormProps = {
  email: "testyMocky@goodLuck.com",
  password: PASSWORD,
  checkPassword: PASSWORD,
  role: UserRole.Listener,
};

// =============================================
// Create Account
// =============================================

describe("<Auth /> & isSignIn=false", () => {
  let renderResult: RenderResult;
  let mockedClient = createMockClient();

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Auth />
          </HelmetProvider>
        </ApolloProvider>
      );
    });
    const { getByText } = renderResult;
    const noAccountBtn = getByText("Create an account");
    await waitFor(() => {
      userEvent.click(noAccountBtn);
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create account | Nodcast");
    });
  });

  it("should display check password validation errora", async () => {
    const somePassword = "somePasswordIDK";
    const { getByPlaceholderText, getByRole } = renderResult;
    const passwordInput = getByPlaceholderText("Password");
    const checkPasswordInput = getByPlaceholderText(/check password/i);

    await waitFor(() => {
      userEvent.type(passwordInput, somePassword);
      userEvent.type(checkPasswordInput, somePassword.substr(0, 6));
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.CHECK_PASS_INVALID_ERR);

    await waitFor(() => {
      userEvent.type(passwordInput, somePassword);
      userEvent.clear(checkPasswordInput);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.CHECK_PASS_REQUIRED_ERR);
  });

  it("should render sign-in page", async () => {
    const { getByText } = renderResult;
    const hasAccountBtn = getByText("Sign in");
    await waitFor(() => {
      userEvent.click(hasAccountBtn);
    });
    await waitFor(() => {
      expect(document.title).toBe("Sign in | Nodcast");
    });
  });

  it("should display mutaion error / should focus password input", async () => {
    const { getByPlaceholderText, getByTestId, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    const roleSelect = getByTestId("user-role-select");
    const passwordInput = getByPlaceholderText("Password");
    const checkPasswordInput = getByPlaceholderText(/check password/i);
    const submitBtn = getByRole("button");

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: { createAccount: { ok: true, error: MUTATION_ERR } },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedMutationResponse
    );

    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.selectOptions(roleSelect, formData.role);
      userEvent.type(passwordInput, formData.password);
      userEvent.type(checkPasswordInput, formData.checkPassword);
      userEvent.click(submitBtn);
    });

    const { checkPassword, ...inputValues } = formData;
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        ...inputValues,
      },
    } as createAccountMutationVariables);
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(MUTATION_ERR);
    expect(passwordInput).toHaveTextContent("");
    expect(passwordInput).toHaveFocus();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

// =============================================
// Sign in
// =============================================

describe("<Auth /> & isSignIn=true", () => {
  let renderResult: RenderResult;
  let mockedClient = createMockClient();

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Auth />
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Sign in | Nodcast");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(emailInput, "something wrong");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.EMAIL_INVALID_ERR);

    await waitFor(() => {
      userEvent.clear(emailInput);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.EMAIL_REQUIRED_ERR);
  });

  it("should display password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const passwordInput = getByPlaceholderText(/password/i);

    await waitFor(() => {
      userEvent.type(passwordInput, "p");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.PASS_MIN_LENGTH_ERR);

    await waitFor(() => {
      userEvent.clear(passwordInput);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(AUTH_FORM.PASS_REQUIRED_ERR);
  });

  it("should submit the form and call mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText("Password");
    const submitBtn = getByRole("button");

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: { login: { ok: true, error: MUTATION_ERR, token: "^______^" } },
    });
    mockedClient.setRequestHandler(LOG_IN_MUTATION, mockedMutationResponse);

    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(submitBtn);
    });

    const { checkPassword, role, ...inputValues } = formData;
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        ...inputValues,
      },
    } as createAccountMutationVariables);
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(MUTATION_ERR);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
