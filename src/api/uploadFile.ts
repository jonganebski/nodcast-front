import { SERVER_URI } from "../constants";

interface IUploadFileOutput {
  ok: boolean;
  err?: string;
  url?: string;
}

export const uploadFile = async (
  formData: FormData
): Promise<IUploadFileOutput> => {
  const response = await fetch(`${SERVER_URI}/api/v1/upload`, {
    method: "POST",
    body: formData,
  });
  const result = (await response.json()) as IUploadFileOutput;
  return result;
};
