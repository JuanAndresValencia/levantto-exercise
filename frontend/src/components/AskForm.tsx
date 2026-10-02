import type { ChangeEvent, FormEvent } from "react";

interface AskFormProps {
  question: string;
  loading: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const AskForm = ({
  question,
  loading,
  onQuestionChange,
  onSubmit,
}: AskFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onQuestionChange(e.target.value);

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={question}
        onChange={handleChange}
        placeholder="e.g. Do you deliver to the airport?"
        disabled={loading}
        className="flex-1 rounded-lg border border-[#43372a] bg-[#1d1a15] px-3 py-2.5 text-base text-[#f0e6d2] placeholder-[#8a7c67] outline-none focus:border-[#e0943f]"
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="rounded-lg bg-gradient-to-r from-[#f0a856] to-[#b35f21] px-4 py-2.5 text-base font-semibold text-[#1a1208] disabled:opacity-40"
      >
        {loading ? "Asking..." : "Ask"}
      </button>
    </form>
  );
};
