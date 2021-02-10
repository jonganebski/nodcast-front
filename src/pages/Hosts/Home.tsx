import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { client } from "../../apollo";
import { FormError } from "../../components/FormError";
import { PODCAST_FORM } from "../../constants";
import {
  GET_PODCAST_QUERY,
  useGetPodcastQuery,
} from "../../hooks/useGetPodcastQuery";
import { useMeQuery } from "../../hooks/useMeQuery";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from "../../__generated__/getPodcastQuery";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      err
      id
    }
  }
`;

interface IFormProps {
  title: string;
  description: string;
  categories: { id: string | boolean }[];
}

export const Home = () => {
  const {
    register,
    errors,
    watch,
    getValues,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const { data: userData } = useMeQuery();

  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok, err, id },
    } = data;
    if (ok) {
      const prevQuery = client.readQuery<
        getPodcastQuery,
        getPodcastQueryVariables
      >({
        query: GET_PODCAST_QUERY,
        variables: { input: {} },
      });
      if (prevQuery && id && userData) {
        const { title, description } = getValues();
        client.writeQuery<getPodcastQuery, getPodcastQueryVariables>({
          query: GET_PODCAST_QUERY,
          variables: { input: {} },
          data: {
            getPodcast: {
              ...prevQuery.getPodcast,
              podcast: {
                __typename: "Podcast",
                id,
                title,
                description,
                episodes: [],
                rating: null,
                subscribersCount: 0,
                creator: {
                  __typename: "Users",
                  id: userData.me.id,
                  username: userData.me.username,
                },
              },
            },
          },
        });
      }
    } else {
      console.log(err);
    }
  };

  const [
    createPodcastMutation,
    { loading: createPodcastLoading },
  ] = useMutation<createPodcastMutation, createPodcastMutationVariables>(
    CREATE_PODCAST_MUTATION,
    { onCompleted }
  );

  const { data, loading } = useGetPodcastQuery();

  const onSubmit = () => {
    const { categories, title, description } = getValues();
    const categoryIds = categories.reduce((acc, value) => {
      if (value.id) {
        acc.push(+value.id);
      }
      return acc;
    }, [] as number[]);
    createPodcastMutation({
      variables: { input: { title, description, categoryIds } },
    });
  };

  const choosenCategoriesCount =
    getValues().categories?.filter((category) => category.id).length ?? 0;
  console.log(data);
  return (
    <main className="container">
      {data?.getPodcast.podcast ? null : (
        <>
          <h2 className="mb-5">Welcome 🙌</h2>
          <p className="text-sm mb-20">
            It's happy to see my new host! I hope you to share wonderful
            experiences with my listeners. This site is developed for learning
            purpose. Please remember you only can make one podcast channel per
            one host account.
          </p>
          <form className="grid gap-y-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="grid gap-y-1">
              <span className="text-sm">Title:</span>
              <input
                className="p-3 border border-gray-400"
                ref={register({
                  required: PODCAST_FORM.TITLE_REQUIRED_ERR,
                  maxLength: {
                    value: PODCAST_FORM.TITLE_MAX_LENGTH,
                    message: PODCAST_FORM.TITLE_MAX_LENGTH_ERR,
                  },
                })}
                name="title"
                placeholder="Title of your podcast"
              />
              {errors.title && <FormError err={errors.title.message} />}
            </label>
            <label className="grid gap-y-1">
              <div className="flex justify-between text-sm">
                <span>Description:</span>
                <span
                  className={`${
                    errors.description?.type === "maxLength" && "text-red-500"
                  }`}
                >
                  ({watch().description?.length} /{" "}
                  {PODCAST_FORM.PODCAST_DESC_MAX_LENGTH})
                </span>
              </div>
              <textarea
                className="h-40 p-3 border border-gray-400 resize-none"
                ref={register({
                  maxLength: {
                    value: PODCAST_FORM.PODCAST_DESC_MAX_LENGTH,
                    message: PODCAST_FORM.PODCAST_DESC_MAX_LENGTH_ERR,
                  },
                })}
                name="description"
                placeholder="Describe your podcast"
              />
              {errors.description && (
                <FormError err={errors.description.message} />
              )}
            </label>
            <div>
              <span className="text-sm">
                Choose categories of your podcast: ({choosenCategoriesCount}
                /3)
              </span>
              <div className="mt-2 grid grid-cols-3">
                {data?.getPodcast.categories?.map((category, i) => {
                  return (
                    <label
                      className="flex items-center cursor-pointer"
                      key={category.id}
                    >
                      <input
                        className="mr-2"
                        ref={register()}
                        type="checkbox"
                        name={`categories[${i}].id`}
                        value={category.id}
                        disabled={
                          choosenCategoriesCount >= 3 &&
                          getValues().categories[i].id === false
                        }
                      />
                      <span>{category.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <button className="w-full py-4 border">Create podcast</button>
          </form>
        </>
      )}
    </main>
  );
};
