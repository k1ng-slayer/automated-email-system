export type SendResponse = {
  total_rows: number;
  processed_rows: number;
  sent_count: number;
  skipped_count: number;
  failures: string[];
};

export type Workflow = "defaulter" | "customize";

export type RoutePath =
  | "/"
  | "/instructions/defaulter"
  | "/instructions/customize"
  | "/workflow/defaulter"
  | "/workflow/customize"
  | "/success";

export type LastRun = {
  workflow: Workflow;
  result: SendResponse;
} | null;

export type SharedFieldState = {
  email: string;
  password: string;
  sheetName: string;
};

export type WorkflowFormState = {
  subject: string;
  threshold: string;
  message: string;
  file: File | null;
  error: string | null;
  sending: boolean;
};
