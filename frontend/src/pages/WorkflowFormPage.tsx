import type { FormEvent } from "react";

import { excelAccept } from "../constants/routes";
import { SharedFields } from "../components/SharedFields";
import type { SharedFieldState, Workflow } from "../types/email";

type WorkflowFormPageProps = {
  workflow: Workflow;
  shared: SharedFieldState;
  setShared: (next: Partial<SharedFieldState>) => void;
  state: {
    subject: string;
    threshold: string;
    message: string;
    error: string | null;
    sending: boolean;
  };
  onSubjectChange: (value: string) => void;
  onThresholdChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function WorkflowFormPage({
  workflow,
  shared,
  setShared,
  state,
  onSubjectChange,
  onThresholdChange,
  onMessageChange,
  onFileChange,
  onSubmit,
}: WorkflowFormPageProps) {
  const isCustomize = workflow === "customize";

  return (
    <div className="rounded-2xl border border-[#b11f3c]/20 bg-white p-5 shadow-sm">
      <SharedFields
        email={shared.email}
        password={shared.password}
        sheetName={shared.sheetName}
        setEmail={(value) => setShared({ email: value })}
        setPassword={(value) => setShared({ password: value })}
        setSheetName={(value) => setShared({ sheetName: value })}
      />

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {isCustomize ? (
          <label className="flex flex-col gap-2 text-sm text-[#532331]">
            Subject
            <input
              required
              value={state.subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
            />
          </label>
        ) : (
          <label className="flex flex-col gap-2 text-sm text-[#532331]">
            Threshold (%)
            <input
              required
              min={0}
              max={100}
              type="number"
              value={state.threshold}
              onChange={(event) => onThresholdChange(event.target.value)}
              className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
            />
          </label>
        )}

        <label className="flex flex-col gap-2 text-sm text-[#532331]">
          Message
          <textarea
            required={isCustomize}
            rows={4}
            value={state.message}
            onChange={(event) => onMessageChange(event.target.value)}
            className="rounded-md border border-[#b11f3c]/30 bg-white px-3 py-2 outline-none focus:border-[#b11f3c]"
          />
        </label>

        <input
          required
          type="file"
          accept={excelAccept}
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          className="block w-full cursor-pointer text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#b11f3c] file:px-3 file:py-2 file:text-white"
        />

        <button
          type="submit"
          disabled={state.sending}
          className="rounded-md bg-[#b11f3c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8f1a35] disabled:opacity-50"
        >
          {state.sending ? "Sending..." : "Send"}
        </button>

        {state.error && (
          <div className="rounded-md border border-red-400/60 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
