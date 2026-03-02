import type { SendResponse, SharedFieldState } from "../types/email";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

async function parseResponse(response: Response): Promise<SendResponse> {
  const payload = await response.json();
  if (!response.ok) {
    const detail =
      typeof payload?.detail === "string" ? payload.detail : "Request failed.";
    throw new Error(detail);
  }
  return payload as SendResponse;
}

async function postMultipart(
  endpoint: string,
  formData: FormData,
): Promise<SendResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  return parseResponse(response);
}

export async function sendDefaulterEmails(
  shared: SharedFieldState,
  values: { message: string; threshold: string; file: File },
): Promise<SendResponse> {
  const formData = new FormData();
  formData.append("email", shared.email);
  formData.append("password", shared.password);
  formData.append("sheet_name", shared.sheetName);
  formData.append("message", values.message);
  formData.append("threshold", values.threshold);
  formData.append("file", values.file);
  return postMultipart("/defaulter/send", formData);
}

export async function sendCustomizeEmails(
  shared: SharedFieldState,
  values: { subject: string; message: string; file: File },
): Promise<SendResponse> {
  const formData = new FormData();
  formData.append("email", shared.email);
  formData.append("password", shared.password);
  formData.append("sheet_name", shared.sheetName);
  formData.append("subject", values.subject);
  formData.append("message", values.message);
  formData.append("file", values.file);
  return postMultipart("/customize/send", formData);
}
