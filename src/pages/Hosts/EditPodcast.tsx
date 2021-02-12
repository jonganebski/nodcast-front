import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { uploadFile } from "../../api/uploadFile";
import { IPodcastForm, PodcastForm } from "../../components/PodcastForm";
import { useEditPodcastMutation } from "../../hooks/mutations/useEditPodcastMutation";
import { useGetPodcastQuery } from "../../hooks/useGetPodcastQuery";

export const EditPodcast = () => {
  const { data, loading: pageLoading } = useGetPodcastQuery();
  const history = useHistory();
  const [src, setSrc] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const formMethods = useForm<IPodcastForm>({
    mode: "onChange",
  });
  const { setValue, getValues } = formMethods;
  const [editPodcastMutation] = useEditPodcastMutation(data?.getPodcast);

  useEffect(() => {
    const podcast = data?.getPodcast.podcast;
    const allCategories = data?.getPodcast.categories;
    if (podcast && allCategories) {
      setSrc(podcast.coverUrl ?? "");
      setValue("title", podcast.title, { shouldValidate: true });
      setValue("description", podcast.description);
      setValue(
        "categories",
        allCategories.map((category) => {
          if (podcast.categories.some((c) => c.id === category.id)) {
            return { id: category.id + "" };
          }
          return { id: false };
        }),
        { shouldValidate: true }
      );
    }
  }, [data?.getPodcast.categories, data?.getPodcast.podcast, setValue]);

  const onSubmit = async () => {
    if (!data?.getPodcast.podcast) {
      return;
    }
    setSubmitLoading(true);
    const { title, description, categories, files } = getValues();
    const file = files?.[0];
    let coverUrl = data.getPodcast.podcast.coverUrl;
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const { ok, url } = await uploadFile(formData);
        if (ok && url) {
          coverUrl = url;
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    }
    const categoryIds = categories.reduce((acc, value) => {
      if (value.id) {
        acc.push(+value.id);
      }
      return acc;
    }, [] as number[]);
    const { errors } = await editPodcastMutation({
      variables: {
        input: {
          podcastId: data?.getPodcast.podcast?.id,
          title,
          description,
          categoryIds,
          coverUrl,
        },
      },
    });
    setSubmitLoading(false);
    if (!errors) {
      history.push("/");
    }
  };

  return (
    <main className="container">
      <FormProvider {...formMethods}>
        <PodcastForm
          categories={data?.getPodcast.categories}
          onSubmit={onSubmit}
          setSrc={setSrc}
          src={src}
          submitLoading={submitLoading}
          editTarget={data?.getPodcast.podcast}
        />
      </FormProvider>
    </main>
  );
};
