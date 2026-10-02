export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface AskResult {
  answer: string;
  grounded: boolean;
  citedSections: string[];
}

export interface ChatMessage extends AskResult {
  id: string;
  question: string;
  askedAt: number;
}
