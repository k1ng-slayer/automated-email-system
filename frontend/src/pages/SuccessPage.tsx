import { SuccessSummary } from "../components/SuccessSummary";
import type { LastRun } from "../types/email";

type SuccessPageProps = {
  lastRun: LastRun;
  onBackToDashboard: () => void;
};

export function SuccessPage({ lastRun, onBackToDashboard }: SuccessPageProps) {
  return (
    <div className="rounded-2xl border border-[#b11f3c]/25 bg-[#fff7f9] p-5 text-sm shadow-sm">
      <h2 className="text-lg font-semibold text-[#8f1a35]">
        Your form has been submitted
      </h2>
      {!lastRun && (
        <p className="mt-2 text-[#5b2a36]">
          No recent submission found in this session.
        </p>
      )}
      {lastRun && (
        <SuccessSummary
          result={lastRun.result}
          workflowLabel={lastRun.workflow}
        />
      )}
      <button
        type="button"
        onClick={onBackToDashboard}
        className="mt-4 rounded-md bg-[#b11f3c] px-3 py-2 text-sm font-semibold text-white hover:bg-[#8f1a35]"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
