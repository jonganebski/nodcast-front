import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "../../components/Alert";
import { EpisodeBlock } from "../../components/EpisodeBlock";
import { EpisodeBlockSkeleton } from "../../components/EpisodeBlockSkeleton";
import { EpisodeForm } from "../../components/EpisodeForm";
import { useDeleteEpisodeMutation } from "../../hooks/mutations/useDeleteEpisodeMutation";
import { useGetEpisodesQuery } from "../../hooks/queries/useGetEpisodesQuery";

interface IFormProps {
  title: string;
  description: string;
  files: FileList;
}

export interface IFileInfo {
  duration: number;
  fileName: string;
  lastModified: number;
}

export const Episodes = () => {
  const { data, loading: pageLoading } = useGetEpisodesQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfo, setFileInfo] = useState<IFileInfo | null>(null);
  const [editTargetId, setEditTargetId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const formMethods = useForm<IFormProps>({ mode: "onChange" });

  const [
    deleteEpisodeMutation,
    { loading: deleteEpisodeLoading },
  ] = useDeleteEpisodeMutation();

  const resetDrawer = () => {
    resetForm();
    setIsDrawerOpen(false);
  };

  const resetForm = () => {
    formMethods.reset({ title: "", description: "" });
    setEditTargetId(null);
    setFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.files = null;
    }
  };

  const handleDrawer = () => {
    setIsDrawerOpen((prev) => {
      if (prev === true) {
        resetForm();
      }
      return !prev;
    });
  };

  const startEditEpisode = (episodeId: number) => {
    setEditTargetId(episodeId);
    setIsDrawerOpen(true);
  };

  const findEpisode = (targetId: number | null) => {
    if (targetId) {
      const target = data?.getEpisodes.episodes?.find(
        (episode) => episode.id === targetId
      );
      if (target) {
        return target;
      }
    }
    return null;
  };

  return (
    <main className="container">
      <Helmet>
        <title>My Episodes | Nodcast</title>
      </Helmet>
      <button
        className={`w-full py-2 focus:outline-none ${
          isDrawerOpen ? "shadow-inner" : "shadow-md"
        }`}
        onClick={handleDrawer}
      >
        {isDrawerOpen ? "Cancel" : "Create episode"}
      </button>
      <section
        className={`overflow-hidden transition-all duration-500 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: isDrawerOpen ? "650px" : "0px" }}
      >
        <FormProvider {...formMethods}>
          <EpisodeForm
            fileInputRef={fileInputRef}
            fileInfo={fileInfo}
            setFileInfo={setFileInfo}
            resetDrawer={resetDrawer}
            editTarget={findEpisode(editTargetId)}
          />
        </FormProvider>
      </section>
      <ul>
        {pageLoading
          ? Array(5)
              .fill("")
              .map((_, i) => {
                return <EpisodeBlockSkeleton key={i} />;
              })
          : data?.getEpisodes.episodes
              ?.filter((episode) => {
                if (editTargetId === null) {
                  return true;
                }
                return episode.id === editTargetId;
              })
              .map((episode) => {
                return (
                  <EpisodeBlock
                    episode={episode}
                    isCreator={true}
                    podcastTitle={data.getEpisodes.podcast?.title}
                    coverUrl={data.getEpisodes.podcast?.coverUrl}
                    startEditEpisode={startEditEpisode}
                    setDeleteTargetId={setDeleteTargetId}
                    key={episode.id}
                  />
                );
              })}
      </ul>
      {deleteTargetId && findEpisode(deleteTargetId) && (
        <Alert
          actionText="Delete"
          text={`You are deleting episode "${
            findEpisode(deleteTargetId)?.title
          }"`}
          cancelCallBack={() => setDeleteTargetId(null)}
          actionLoading={deleteEpisodeLoading}
          actionCallBack={async () => {
            await deleteEpisodeMutation({
              variables: { input: { episodeId: deleteTargetId } },
            });
            setDeleteTargetId(null);
          }}
        />
      )}
    </main>
  );
};
