import type { AskResult, Section } from "../types";

interface AnswerCardProps {
  result: AskResult;
  sections: Section[];
}

export const AnswerCard = ({ result, sections }: AnswerCardProps) => {
  const sectionTitle = (id: string) =>
    sections.find((s) => s.id === id)?.title ?? id;

  const palette = result.grounded
    ? "bg-[#15201a] border-[#2f4a3a]"
    : "bg-[#241a12] border-[#4a3420]";

  return (
    <div className={`mt-2 rounded-lg border p-4 ${palette}`}>
      <p className="whitespace-pre-wrap text-[#f0e6d2]">{result.answer}</p>
      {result.grounded && result.citedSections.length > 0 && (
        <p className="mt-2 text-sm font-semibold text-[#7fd9a8]">
          Source: {result.citedSections.map(sectionTitle).join(", ")}
        </p>
      )}
      {!result.grounded && (
        <p className="mt-2 text-sm font-semibold text-[#e0943f]">
          Not covered by the knowledge source
        </p>
      )}
    </div>
  );
};
