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
