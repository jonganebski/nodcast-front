import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { PODCAST_FORM } from "../constants";
import {
  getPodcastQuery_getPodcast_categories,
  getPodcastQuery_getPodcast_podcast,
} from "../__generated__/getPodcastQuery";
import { ButtonWide } from "./ButtonWide";
import { FormError } from "./FormError";
import { PodcastCover } from "./PodcastCover";

export interface IPodcastForm {
  title: string;
  description: string;
  categories: { id: string | boolean }[];
  files: FileList;
}

interface IPodcastFormProps {
  categories: getPodcastQuery_getPodcast_categories[] | null | undefined;
  onSubmit: () => void;
  submitLoading: boolean;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  src: string;
  editTarget?: getPodcastQuery_getPodcast_podcast | null | undefined;
}

export const PodcastForm: React.FC<IPodcastFormProps> = ({
  categories,
  onSubmit,
  submitLoading,
  setSrc,
  src,
  editTarget,
}) => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    getValues,
    formState,
  } = useFormContext<IPodcastForm>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const choosenCategoriesCount =
    getValues().categories?.filter((category) => category.id).length ?? 0;

  return (
    <form className="grid gap-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <label className="mt-auto w-2/3 grid gap-y-1">
          <span className="text-sm">Title:</span>
          <input
            className="px-3 py-2 border border-gray-400"
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
        <div
          className="cursor-pointer"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <PodcastCover size={28} coverUrl={src} title={watch().title} />
        </div>
        <input
          className="hidden"
          ref={(ref) => {
            register(ref);
            fileInputRef.current = ref;
          }}
          name="files"
          type="file"
          multiple={false}
          accept="image/jpeg, image/jpg"
          onChange={(e) => {
            const { files } = e.currentTarget;
            if (files && files?.[0]) {
              const file = files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                const result = e.target?.result;
                if (result && typeof result === "string") {
                  setSrc(result);
                }
              };
              reader.readAsDataURL(file);
            } else {
              if (editTarget?.coverUrl) {
                setSrc(editTarget.coverUrl);
              } else {
                setSrc("");
              }
            }
          }}
        />
      </div>
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
      <ButtonWide
        text={editTarget ? "Edit podcast" : "Create podcast"}
        disabled={!formState.isValid}
        loading={submitLoading}
      />
    </form>
  );
};
