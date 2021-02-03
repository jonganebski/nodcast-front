import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_FORM, EMAIL_REGEX, TOKEN_NAME } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { FormError } from "../components/FormError";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";
import {
  logInMutation,
  logInMutationVariables,
} from "../__generated__/logInMutation";
import { Helmet } from "react-helmet-async";

export interface IAuthFormProps {
  email: string;
  role: UserRole;
  password: string;
  checkPassword: string;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

export const LOG_IN_MUTATION = gql`
  mutation logInMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [outputErr, setOutputErr] = useState("");
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
    reset,
  } = useForm<IAuthFormProps>({
    mode: "onChange",
  });

  const onCreateAccountCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      setIsSignIn(true);
      reset({ email: getValues().email });
      passwordInputRef.current?.focus();
    }
    if (error) {
      setOutputErr(error);
    }
  };
  const onLoginCompleted = (data: logInMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(TOKEN_NAME, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
    if (error) {
      setOutputErr(error);
    }
  };

  const [
    createAccountMutation,
    { loading: isCreateAccountLoading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: onCreateAccountCompleted,
    }
  );
  const [logInMutation, { loading: isLoginLoading }] = useMutation<
    logInMutation,
    logInMutationVariables
  >(LOG_IN_MUTATION, {
    onCompleted: onLoginCompleted,
  });

  const onSubmit = () => {
    const { email, role, password } = getValues();
    if (isSignIn) {
      logInMutation({ variables: { input: { email, password } } });
    } else {
      createAccountMutation({
        variables: { input: { email, role, password } },
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20">
      <Helmet>
        <title>{isSignIn ? "Sign in" : "Create account"} | Nodcast</title>
      </Helmet>
      <header className="py-10 text-center text-2xl">
        {isSignIn ? "Sign in " : "Create account "}
        <div className="inline-block cursor-pointer transition duration-700 ease-in-out transform hover:rotate-12">
          <span role="img" aria-label="hello">
            👋
          </span>
        </div>
      </header>
      <main>
        <form
          className="grid gap-4 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="grid gap-2 relative">
            <span
              className="absolute top-2 left-2"
              role="img"
              aria-label="email"
            >
              💌
            </span>
            <input
              ref={register({
                required: AUTH_FORM.EMAIL_REQUIRED_ERR,
                pattern: {
                  value: EMAIL_REGEX,
                  message: AUTH_FORM.EMAIL_INVALID_ERR,
                },
              })}
              name="email"
              className="border px-10 py-2"
              type="email"
              placeholder="Email"
            />
            {errors.email && <FormError err={errors.email.message} />}
          </label>
          {!isSignIn && (
            <label className="grid gap-2">
              <select
                ref={register({ required: "Role field is required" })}
                name="role"
                className="border px-1 py-2"
                data-testid="user-role-select"
              >
                <option
                  value={UserRole.Listener}
                  data-testid="user-role-option"
                >
                  {"🎧"}&nbsp;&nbsp;{UserRole.Listener}
                </option>
                <option value={UserRole.Host} data-testid="user-role-option">
                  {"🎙"}&nbsp;&nbsp;{UserRole.Host}
                </option>
              </select>
            </label>
          )}
          <label className=" relative grid gap-2">
            <span className="absolute top-2 left-2" role="img" aria-label="key">
              🔑
            </span>
            <input
              ref={(ref) => {
                passwordInputRef.current = ref;
                register(ref, {
                  required: AUTH_FORM.PASS_REQUIRED_ERR,
                  minLength: {
                    value: AUTH_FORM.PASS_MIN_LENGTH,
                    message: AUTH_FORM.PASS_MIN_LENGTH_ERR,
                  },
                });
              }}
              name="password"
              className="border px-10 py-2"
              type="password"
              placeholder="Password"
            />
            {errors.password && <FormError err={errors.password.message} />}
          </label>
          {!isSignIn && (
            <label className="relative grid gap-2">
              <span
                className="absolute top-2 left-2"
                role="img"
                aria-label="key"
              >
                🔑
              </span>
              <input
                ref={register({
                  required: AUTH_FORM.CHECK_PASS_REQUIRED_ERR,
                  validate: (v) => {
                    const isValid = v === getValues().password;
                    if (!isValid) {
                      return AUTH_FORM.CHECK_PASS_INVALID_ERR;
                    }
                    return true;
                  },
                })}
                name="checkPassword"
                className="border px-10 py-2"
                type="password"
                placeholder="Check password"
              />
              {errors.checkPassword && (
                <FormError err={errors.checkPassword.message} />
              )}
            </label>
          )}
          <div>
            <button
              className={`border w-full mt-6 p-2 text-white bg-yellow-600 ${
                formState.isValid ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              {isCreateAccountLoading || isLoginLoading ? (
                <div className="relative">
                  <span
                    role="img"
                    aria-label="heart"
                    className="absolute animate-ping"
                  >
                    ❤
                  </span>
                  <span role="img" aria-label="heart">
                    ❤
                  </span>
                </div>
              ) : (
                <span>{isSignIn ? "Sign in" : "Create account"}</span>
              )}
            </button>
            {outputErr && <FormError err={outputErr} />}
          </div>
          <div className="text-center py-10">
            {isSignIn ? (
              <span>
                New to Nodcast?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => setIsSignIn(false)}
                >
                  Create an account
                </span>
              </span>
            ) : (
              <span>
                Already has an accont?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => setIsSignIn(true)}
                >
                  Sign in
                </span>
              </span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};
