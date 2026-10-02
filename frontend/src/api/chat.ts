import { apiClient } from "./client";
import type { AskResult, Section } from "../types";

export const getSections = async (): Promise<Section[]> => {
  const { data } = await apiClient.get<{ sections: Section[] }>("/api/sections");
  return data.sections ?? [];
};

export const askQuestion = async (question: string): Promise<AskResult> => {
  const { data } = await apiClient.post<AskResult>("/api/ask", { question });
  return data;
};
