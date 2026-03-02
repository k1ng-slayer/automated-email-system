type InstructionCardProps = {
  title: string;
  points: string[];
  onNext: () => void;
};

export function InstructionCard({
  title,
  points,
  onNext,
}: InstructionCardProps) {
  return (
    <div className="rounded-2xl border border-[#b11f3c]/20 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#8f1a35]">{title}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-[#3b2230]">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onNext}
        className="mt-6 rounded-md bg-[#b11f3c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8f1a35]"
      >
        Next
      </button>
    </div>
  );
}
