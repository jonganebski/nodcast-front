import { gql, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { client } from "../apollo";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../__generated__/editProfileMutation";
import { meQuery_me } from "../__generated__/meQuery";
import {
  CheckPasswordInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from "./AuthFormInputs";
import { Button } from "./Button";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      err
    }
  }
`;

interface IFormProps {
  email: string;
  username: string;
  password: string;
  ckeckPassword: string;
}

interface IEditProfileModalProps {
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  me: meQuery_me;
}

export const EditProfileModal: React.FC<IEditProfileModalProps> = ({
  isEditProfileOpen,
  setIsEditProfileOpen,
  me,
}) => {
  const f = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: { email: me.email, username: me.username },
  });

  const { getValues, reset, handleSubmit, setError } = f;

  useEffect(() => {
    if (
      !isEditProfileOpen &&
      (getValues().email !== me.email || getValues().username !== me.username)
    ) {
      reset({ email: me.email, username: me.username });
    }
  }, [getValues, isEditProfileOpen, me.email, me.username, reset]);

  const onEditProfileCompleted = (data: editProfileMutation) => {
    const {
      editProfile: { ok, err },
    } = data;
    if (ok) {
      const { email, username } = getValues();
      client.writeFragment<meQuery_me>({
        id: `Users:${me.id}`,
        fragment: gql`
          fragment EditedUser on Users {
            id
            email
            username
            role
            subscriptions {
              id
            }
          }
        `,
        data: { ...me, email, username },
      });
    } else if (err) {
      if (err.toLowerCase().includes("email")) {
        setError("email", { message: err });
      } else if (err.toLowerCase().includes("username")) {
        setError("username", { message: err });
      }
    }
  };

  const [
    editProfileMutation,
    { loading: editProfileLoading, error },
  ] = useMutation<editProfileMutation, editProfileMutationVariables>(
    EDIT_PROFILE_MUTATION,
    { onCompleted: onEditProfileCompleted }
  );

  const onSubmit = () => {
    const { email, username, password } = getValues();
    if (password) {
      editProfileMutation({
        variables: { input: { email, username, password } },
      });
    } else {
      editProfileMutation({
        variables: { input: { email, username } },
      });
    }
  };

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bg-gray-700 w-full h-full transition-all duration-500 ${
          isEditProfileOpen
            ? "opacity-40 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsEditProfileOpen(false)}
      />
      <section
        className={`fixed z-20 top-48 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg grid gap-y-4 place-items-center transition-all duration-500 ${
          isEditProfileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <FontAwesomeIcon
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setIsEditProfileOpen(false)}
          icon={faTimes}
        />
        <h2 className="font-semibold text-lg">Edit profile</h2>
        <FormProvider {...f}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-2 mb-4">
              <EmailInput />
              <UsernameInput />
            </div>
            <div className="grid gap-y-2 mb-4">
              <h4 className="text-sm text-gray-600">
                Leave empty if you don't want to change password
              </h4>
              <PasswordInput isEditMode={true} />
              <CheckPasswordInput isEditMode={true} />
            </div>
            <div className="flex justify-end">
              <Button
                text="Update"
                disabled={editProfileLoading}
                loading={editProfileLoading}
              />
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};
