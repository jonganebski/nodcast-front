import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { uploadFile } from "../api/uploadFile";
import { EPISODE_FORM } from "../constants";
import { useCreateEpisodeMutation } from "../hooks/mutations/useCreateEpisodeMutation";
import { useEditRpisodeMutation } from "../hooks/mutations/useEditEpisodeMutation";
import { IFileInfo } from "../pages/Hosts/Episodes";
import { getEpisodesQuery_getEpisodes_episodes } from "../__generated__/getEpisodesQuery";
import { ButtonWide } from "./ButtonWide";
import { FormError } from "./FormError";

interface IFormProps {
  title: string;
  description: string;
  files: FileList;
}

interface IEpisodeFromProps {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  fileInfo: IFileInfo | null;
  setFileInfo: React.Dispatch<React.SetStateAction<IFileInfo | null>>;
  resetDrawer: () => void;
  editTarget: getEpisodesQuery_getEpisodes_episodes | null;
}

export const EpisodeForm: React.FC<IEpisodeFromProps> = ({
  fileInputRef,
  fileInfo,
  setFileInfo,
  resetDrawer,
  editTarget,
}) => {
  const [serverErr, setServerErr] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    handleSubmit,
    errors,
    register,
    getValues,
    watch,
    reset,
    formState,
    setValue,
  } = useFormContext<IFormProps>();
  const [createEpisodeMutation] = useCreateEpisodeMutation(resetDrawer);

  const [editEpisodeMutation] = useEditRpisodeMutation(resetDrawer);

  const loadFile = (files: FileList | null) => {
    if (files && files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result !== "string") {
          const audioContext = new AudioContext();
          audioContext.decodeAudioData(e.target.result, (buffer) => {
            setFileInfo({
              duration: Math.round(buffer.duration),
              fileName: files[0].name,
              lastModified: files[0].lastModified,
            });
          });
        }
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  useEffect(() => {
    if (editTarget && !fileInfo) {
      const { title, description } = editTarget;
      reset({ title, description });
      setFileInfo({
        duration: editTarget.dutationSeconds,
        fileName: editTarget.audioUrl.split("audios/")[1],
        lastModified: editTarget.createdAt,
      });
    }
  }, [editTarget, fileInfo, reset, setFileInfo]);

  const onSubmit = async () => {
    if (!fileInfo?.duration) {
      return;
    }
    setSubmitLoading(true);
    const { files, title, description } = getValues();
    if (editTarget) {
      let audioUrl = editTarget.audioUrl;
      if (files?.[0]) {
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
          const { ok, url, err } = await uploadFile(formData);
          if (ok && url) {
            audioUrl = url;
          } else {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
          setServerErr("Failed to submit");
        }
      }
      await editEpisodeMutation({
        variables: {
          input: {
            episodeId: editTarget.id,
            title,
            description,
            audioUrl,
            dutationSeconds: fileInfo.duration,
          },
        },
      });
    } else {
      const formData = new FormData();
      formData.append("file", files[0]);
      try {
        const { ok, url, err } = await uploadFile(formData);
        if (ok && url) {
          await createEpisodeMutation({
            variables: {
              input: {
                title,
                description,
                audioUrl: url,
                dutationSeconds: fileInfo.duration,
              },
            },
          });
        } else {
          console.log(err);
          throw new Error();
        }
      } catch (err) {
        console.log(err);
        setServerErr("Failed to submit");
      }
    }
    setSubmitLoading(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (fileInputRef.current) {
      setValue("files", files, { shouldValidate: true });
      loadFile(files);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="grid gap-y-5 py-5 border-b"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="h-44 mb-6 flex flex-col items-center justify-evenly border border-dashed border-blue-300 cursor-pointer hover:bg-blue-50"
        onClick={() => {
          fileInputRef.current?.click();
        }}
        onDragOver={onDragOver}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <span className="text-5xl">🎙</span>
        {fileInfo ? (
          <div className="text-sm text-gray-600 text-center">
            <h6 className="font-semibold text-gray-900">{fileInfo.fileName}</h6>
            <h6>{new Date(fileInfo.lastModified).toLocaleString()}</h6>
            <h6>{fileInfo.duration} seconds</h6>
          </div>
        ) : (
          <h6 className="text-sm text-gray-800">Click or Drag N Drop</h6>
        )}
        {errors.files && <FormError err={errors.files.message} />}
      </div>
      <input
        // className="hidden"
        ref={(ref) => {
          register(ref, {
            required: editTarget ? false : EPISODE_FORM.FILE_REQUIRED_ERR,
          });
          fileInputRef.current = ref;
        }}
        onChange={(e) => loadFile(e.currentTarget.files)}
        multiple={false}
        accept="audio/wav, audio/mpeg"
        name="files"
        type="file"
      />
      <label className="grid gap-y-1">
        <span className="text-sm">Title:</span>
        <input
          className="p-3 border border-gray-400"
          ref={register({
            required: EPISODE_FORM.TITLE_REQUIRED_ERR,
            maxLength: {
              value: EPISODE_FORM.TITLE_MAX_LENGTH,
              message: EPISODE_FORM.TITLE_MAX_LENGTH_ERR,
            },
          })}
          name="title"
          placeholder="Title of your episode"
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
            ({watch().description?.length} / {EPISODE_FORM.DESC_MAX_LENGTH})
          </span>
        </div>
        <textarea
          className="h-40 p-3 border border-gray-400 resize-none"
          ref={register({
            maxLength: {
              value: EPISODE_FORM.DESC_MAX_LENGTH,
              message: EPISODE_FORM.DESC_MAX_LENGTH_ERR,
            },
          })}
          name="description"
          placeholder="Describe your episode"
        />
        {errors.description && <FormError err={errors.description.message} />}
      </label>
      <ButtonWide
        text={editTarget ? "Edit episode" : "Create episode"}
        loading={submitLoading}
        disabled={!formState.isValid}
      />
      {serverErr && <FormError err={serverErr} />}
    </form>
  );
};
