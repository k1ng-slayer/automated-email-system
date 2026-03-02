import { InstructionCard } from "../components/InstructionCard";

type InstructionsPageProps = {
  title: string;
  points: string[];
  onNext: () => void;
};

export function InstructionsPage({
  title,
  points,
  onNext,
}: InstructionsPageProps) {
  return <InstructionCard title={title} points={points} onNext={onNext} />;
}
