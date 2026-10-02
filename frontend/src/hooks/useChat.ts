import { useEffect, useState, type FormEvent } from "react";
import { askQuestion, getSections } from "../api/chat";
import { useChatStore } from "../store/chatStore";
import type { Section } from "../types";

export const useChat = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    getSections()
      .then(setSections)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const asked = question.trim();
    setLoading(true);
    setError(null);

    try {
      const data = await askQuestion(asked);
      addMessage(asked, data);
      setQuestion("");
    } catch {
      setError("Something went wrong asking that question. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    loading,
    error,
    messages,
    sections,
    handleSubmit,
  };
};
