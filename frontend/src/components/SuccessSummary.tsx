import type { SendResponse } from "../types/email";

type SuccessSummaryProps = {
  result: SendResponse;
  workflowLabel: string;
};

export function SuccessSummary({ result, workflowLabel }: SuccessSummaryProps) {
  return (
    <div className="mt-3 space-y-1 text-[#3f1f2b]">
      <p>Workflow: {workflowLabel}</p>
      <p>Rows in sheet: {result.total_rows}</p>
      <p>Processed rows: {result.processed_rows}</p>
      <p>Emails sent: {result.sent_count}</p>
      <p>Skipped rows: {result.skipped_count}</p>
      {result.failures.length > 0 && (
        <p className="mt-2 text-[#9a2a42]">
          {result.failures.length} row(s) failed.
        </p>
      )}
    </div>
  );
}
