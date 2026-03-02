type DashboardPageProps = {
  onOpenDefaulterInstructions: () => void;
  onStartDefaulter: () => void;
  onOpenCustomizeInstructions: () => void;
  onStartCustomize: () => void;
};

export function DashboardPage({
  onOpenDefaulterInstructions,
  onStartDefaulter,
  onOpenCustomizeInstructions,
  onStartCustomize,
}: DashboardPageProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[#b11f3c]/20 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-[#8f1a35]">Defaulter</h2>
        <p className="mt-2 text-sm text-[#5b2a36]">
          Send attendance warning emails to students below a threshold.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onOpenDefaulterInstructions}
            className="rounded-md border border-[#b11f3c]/35 bg-[#fff7f9] px-3 py-2 text-sm text-[#7d1530] hover:bg-[#ffeaf0]"
          >
            Instructions
          </button>
          <button
            type="button"
            onClick={onStartDefaulter}
            className="rounded-md bg-[#b11f3c] px-3 py-2 text-sm font-semibold text-white hover:bg-[#8f1a35]"
          >
            Start
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#b11f3c]/20 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-[#8f1a35]">Customize</h2>
        <p className="mt-2 text-sm text-[#5b2a36]">
          Send customized subject/message emails using student email records.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onOpenCustomizeInstructions}
            className="rounded-md border border-[#b11f3c]/35 bg-[#fff7f9] px-3 py-2 text-sm text-[#7d1530] hover:bg-[#ffeaf0]"
          >
            Instructions
          </button>
          <button
            type="button"
            onClick={onStartCustomize}
            className="rounded-md bg-[#b11f3c] px-3 py-2 text-sm font-semibold text-white hover:bg-[#8f1a35]"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
