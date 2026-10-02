import { useEffect, useRef } from "react";
import { AnswerCard } from "./AnswerCard";
import { TypingIndicator } from "./TypingIndicator";
import type { ChatMessage, Section } from "../types";

interface ChatHistoryProps {
  messages: ChatMessage[];
  sections: Section[];
  loading: boolean;
}

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const ChatHistory = ({ messages, sections, loading }: ChatHistoryProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <p className="mt-6 text-sm text-[#8a7c67]">
        No questions asked yet — try one below.
      </p>
    );
  }

  return (
    <div className="mt-6 max-h-96 overflow-y-auto pr-1">
      {messages.map((message) => (
        <div key={message.id} className="mb-5 last:mb-0">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-medium text-[#f6ecd9]">{message.question}</p>
            <span className="shrink-0 text-xs text-[#8a7c67]">
              {formatDate(message.askedAt)}
            </span>
          </div>
          <AnswerCard result={message} sections={sections} />
        </div>
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};
