import { faHeadphones, faPenNib } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormProvider, useForm } from "react-hook-form";
import { uploadFile } from "../../api/uploadFile";
import { Button } from "../../components/Button";
import { IPodcastForm, PodcastForm } from "../../components/PodcastForm";
import { RatingStars } from "../../components/RatingStars";
import { ReviewsDrawer } from "../../components/ReviewsDrawer";
import { useCreatePodcastMutation } from "../../hooks/mutations/useCreatePodcastMutation";
import { useGetPodcastQuery } from "../../hooks/useGetPodcastQuery";
import { useMeQuery } from "../../hooks/useMeQuery";

export const Home = () => {
  const { data: userData } = useMeQuery();
  const [src, setSrc] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const f = useForm<IPodcastForm>({
    mode: "onChange",
  });
  const { getValues } = f;

  const [createPodcastMutation] = useCreatePodcastMutation();

  const { data, loading } = useGetPodcastQuery();

  const onSubmit = async () => {
    setSubmitLoading(true);
    const { categories, title, description, files } = getValues();
    const file = files?.[0];
    let coverUrl = null;
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
    await createPodcastMutation({
      variables: { input: { title, description, categoryIds, coverUrl } },
    });
    setSubmitLoading(false);
  };

  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(
    null
  );

  useEffect(() => {
    if (audioRecorder) {
      audioRecorder.ondataavailable = (e) => {
        const { data: audioFile } = e;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(audioFile);
        link.download = "nodcast-recorded.wav";
        document.body.appendChild(link);
        link.click();
      };
      audioRecorder.start();
    }
  }, [audioRecorder]);

  return (
    <main className="grid gap-y-10 place-items-center w-full max-w-screen-2xl px-1 mx-auto">
      <Helmet>
        <title>Welcome! | Nodcast</title>
      </Helmet>
      {loading ? null : data?.getPodcast.podcast ? (
        <>
          <h2 className="">{data.getPodcast.podcast.title}</h2>
          <div className="flex flex-col items-center">
            <RatingStars rating={data.getPodcast.podcast.rating ?? 0} />
          </div>
          <div
            className={`w-52 h-52 rounded-full flex items-center justify-center border cursor-pointer shadow-xl active:shadow-inner bg-gray-700`}
            onClick={async (e) => {
              if (navigator.mediaDevices?.getUserMedia) {
                if (audioRecorder) {
                  audioRecorder.stop();
                  setAudioRecorder(null);
                } else {
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                      audio: true,
                    });
                    const audioRecorder = new MediaRecorder(stream);
                    setAudioRecorder(audioRecorder);
                  } catch (err) {
                    console.log(err);
                  }
                }
              } else {
                alert("Audio record is not supported on your browser!");
              }
            }}
          >
            <div
              className={"w-3 h-3 rounded-full"}
              style={{
                boxShadow: `0px 0px 10px 2px ${
                  audioRecorder ? "#ff000d" : "#66ff00"
                }`,
                backgroundColor: audioRecorder ? "#ff000d" : "#66ff00",
              }}
            ></div>
          </div>
          <div className="grid">
            <Button
              text="Reviews"
              onClick={() => setIsReviewsOpen(true)}
              icon={faPenNib}
            />
            <Button
              text={`Subscribers: ${data.getPodcast.podcast.subscribersCount}`}
              icon={faHeadphones}
            />
          </div>
          {userData && (
            <ReviewsDrawer
              userData={userData}
              podcastId={data.getPodcast.podcast.id}
              podcastCreatorId={userData.me.id}
              isReviewsOpen={isReviewsOpen}
              setIsReviewsOpen={setIsReviewsOpen}
            />
          )}
        </>
      ) : (
        <div className="container">
          <h2 className="mb-5">Welcome 🙌</h2>
          <p className="text-sm mb-20">
            It's happy to see my new host! I hope you to share wonderful
            experiences with my listeners. This site is developed for learning
            purpose. Please remember you only can make one podcast channel per
            one host account.
          </p>
          <FormProvider {...f}>
            <PodcastForm
              setSrc={setSrc}
              src={src}
              categories={data?.getPodcast.categories}
              onSubmit={onSubmit}
              submitLoading={submitLoading}
            />
          </FormProvider>
        </div>
      )}
    </main>
  );
};
