import React from "react";
import { useFormContext } from "react-hook-form";
import { PODCAST_FORM } from "../constants";
import { getPodcastQuery_getPodcast_categories } from "../__generated__/getPodcastQuery";
import { FormError } from "./FormError";

interface IFormProps {
  title: string;
  description: string;
  categories: { id: string | boolean }[];
}

interface IPodcastFormProps {
  categories: getPodcastQuery_getPodcast_categories[] | null | undefined;
  onSubmit: () => void;
}

export const PodcastForm: React.FC<IPodcastFormProps> = ({
  categories,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    getValues,
  } = useFormContext<IFormProps>();

  const choosenCategoriesCount =
    getValues().categories?.filter((category) => category.id).length ?? 0;

  return (
    <form className="grid gap-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
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
        {errors.description && <FormError err={errors.description.message} />}
      </label>
      <div>
        <span className="text-sm">
          Choose categories of your podcast: ({choosenCategoriesCount}
          /3)
        </span>
        <div className="mt-2 grid grid-cols-3">
          {categories?.map((category, i) => {
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
  );
};
