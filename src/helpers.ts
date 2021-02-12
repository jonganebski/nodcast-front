import { MONTHS } from "./constants";

export const computeTimelapse = (date: any) => {
  let result: number;
  let lapseUnit: string;
  const lapseMS = Date.now() - new Date(date).getTime();
  if (1000 * 60 * 60 * 24 * 7 < lapseMS) {
    const monthIndex = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return MONTHS[monthIndex] + " " + day.toString();
  } else if (1000 * 60 * 60 * 24 < lapseMS) {
    result = Math.round(lapseMS / (1000 * 60 * 60 * 24));
    lapseUnit = "day";
  } else if (1000 * 60 * 60 < lapseMS) {
    result = Math.round(lapseMS / (1000 * 60 * 60));
    lapseUnit = "hour";
  } else if (1000 * 60 < lapseMS) {
    result = Math.round(lapseMS / (1000 * 60));
    lapseUnit = "min";
  } else {
    return "Just now";
  }
  return `${result} ${lapseUnit}${result === 1 ? "" : "s"} ago`;
};

export const shapeAudioDuration = (seconds: number | undefined) => {
  if (!seconds) {
    return "unknown";
  }
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds < 60 * 60) {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;
    return `${min} min ${sec} sec`;
  } else {
    const hr = Math.floor((seconds / 60) * 60);
    const min = Math.floor(seconds / 60 - hr * 60);
    return `${hr} hr ${min} min`;
  }
};

export const shapeAudioDurationDetail = (seconds: number | undefined) => {
  if (!seconds) {
    return "00:00:00";
  }
  const hr = Math.floor(seconds / (60 * 60));
  const min = Math.floor(seconds / 60 - hr * 60 * 60);
  const sec = Math.ceil(seconds - min * 60);
  return `${hr.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

export const shapeDurationLeft = (
  ref: React.MutableRefObject<HTMLAudioElement | null>
) => {
  if (!ref.current?.duration) {
    return "";
  }
  const lapseSeconds = ref.current.duration - ref.current.currentTime;
  if (lapseSeconds < 60) {
    return "ends soon...";
  }
  if (lapseSeconds < 60 * 60) {
    const min = Math.floor(lapseSeconds / 60);
    return `${min} minute${min !== 1 ? "s" : ""} left`;
  }
  const hr = Math.floor(lapseSeconds / (60 * 60));
  const min = Math.floor(lapseSeconds / 60 - hr * 60);
  return `${hr} hour${hr !== 1 ? "s" : ""} ${
    min !== 0 && `${min} minute${min !== 1 ? "s" : ""} left`
  }`;
};
