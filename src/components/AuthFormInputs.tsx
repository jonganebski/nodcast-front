import React from "react";
import { useFormContext } from "react-hook-form";
import { AUTH_FORM, EMAIL_REGEX } from "../constants";
import { FormError } from "./FormError";

export const EmailInput = () => {
  const { register, errors } = useFormContext<{ email: string }>();
  return (
    <label className="grid gap-2 relative">
      <span className="absolute top-2 left-2" role="img" aria-label="email">
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
  );
};

export const UsernameInput = () => {
  const { register, errors } = useFormContext<{ username: string }>();
  return (
    <label className="grid gap-2 relative">
      <span className="absolute top-2 left-2" role="img" aria-label="Ninja">
        🐱‍👤
      </span>
      <input
        ref={register({
          required: AUTH_FORM.USERNAME_REQUIRED_ERR,
          maxLength: {
            value: AUTH_FORM.USERNAME_MAX_LENGTH,
            message: AUTH_FORM.USERNAME_MAX_LENGTH_ERR,
          },
        })}
        name="username"
        className="border px-10 py-2"
        placeholder="Username"
      />
      {errors.username && <FormError err={errors.username.message} />}
    </label>
  );
};

interface IPasswordInputProps {
  passwordInputRef?: React.MutableRefObject<HTMLInputElement | null>;
  isEditMode?: boolean;
}

export const PasswordInput: React.FC<IPasswordInputProps> = ({
  passwordInputRef,
  isEditMode = false,
}) => {
  const { register, errors } = useFormContext<{ password: string }>();
  return (
    <label className=" relative grid gap-2">
      <span className="absolute top-2 left-2" role="img" aria-label="key">
        🔑
      </span>
      <input
        ref={(ref) => {
          if (passwordInputRef) {
            passwordInputRef.current = ref;
          }
          register(ref, {
            required: isEditMode ? false : AUTH_FORM.PASS_REQUIRED_ERR,
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
  );
};

interface ICheckPasswordProps {
  isEditMode?: boolean;
}

export const CheckPasswordInput: React.FC<ICheckPasswordProps> = ({
  isEditMode = false,
}) => {
  const { register, getValues, errors } = useFormContext<{
    password: string;
    checkPassword: string;
  }>();

  return (
    <label className="relative grid gap-2">
      <span className="absolute top-2 left-2" role="img" aria-label="key">
        🔑
      </span>
      <input
        ref={register({
          required: isEditMode ? false : AUTH_FORM.CHECK_PASS_REQUIRED_ERR,
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
      {errors.checkPassword && <FormError err={errors.checkPassword.message} />}
    </label>
  );
};
