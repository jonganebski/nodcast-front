import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormProvider, useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import {
  CheckPasswordInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from "../components/AuthFormInputs";
import { FormError } from "../components/FormError";
import { TOKEN_NAME } from "../constants";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";
import {
  logInMutation,
  logInMutationVariables,
} from "../__generated__/logInMutation";

export interface IAuthFormProps {
  email: string;
  username: string;
  role: UserRole;
  password: string;
  checkPassword: string;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      err
    }
  }
`;

export const LOG_IN_MUTATION = gql`
  mutation logInMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      err
      token
    }
  }
`;

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [outputErr, setOutputErr] = useState("");
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const f = useForm<IAuthFormProps>({
    mode: "onChange",
  });

  const onCreateAccountCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, err },
    } = data;
    if (ok) {
      setIsSignIn(true);
      f.reset({ email: f.getValues().email });
      passwordInputRef.current?.focus();
    }
    if (err) {
      setOutputErr(err);
    }
  };
  const onLoginCompleted = (data: logInMutation) => {
    const {
      login: { ok, err, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(TOKEN_NAME, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
    if (err) {
      setOutputErr(err);
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
    const { email, role, password, username } = f.getValues();
    if (isSignIn) {
      logInMutation({ variables: { input: { email, password } } });
    } else {
      createAccountMutation({
        variables: { input: { email, username, role, password } },
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
        <FormProvider {...f}>
          <form
            className="grid gap-4 w-full max-w-lg mx-auto"
            onSubmit={f.handleSubmit(onSubmit)}
          >
            <EmailInput />
            {!isSignIn && (
              <>
                <UsernameInput />
                <label className="grid gap-2">
                  <select
                    ref={f.register({ required: "Role field is required" })}
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
                    <option
                      value={UserRole.Host}
                      data-testid="user-role-option"
                    >
                      {"🎙"}&nbsp;&nbsp;{UserRole.Host}
                    </option>
                  </select>
                </label>
              </>
            )}
            <PasswordInput passwordInputRef={passwordInputRef} />
            {!isSignIn && <CheckPasswordInput />}
            <div>
              <button
                className={`border w-full mt-6 p-2 text-white bg-yellow-600 ${
                  f.formState.isValid ? "" : "opacity-50 pointer-events-none"
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
        </FormProvider>
      </main>
    </div>
  );
};
