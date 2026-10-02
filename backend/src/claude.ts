import Anthropic from "@anthropic-ai/sdk";
import { knowledgeSections, renderKnowledgeBase } from "./knowledgeBase.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-haiku-4-5";

const validSectionIds = knowledgeSections.map((s) => s.id);

const ANSWER_TOOL: Anthropic.Tool = {
  name: "answer_question",
  description:
    "Submit the final answer to the user's question, grounded strictly in the provided knowledge source.",
  input_schema: {
    type: "object",
    properties: {
      grounded: {
        type: "boolean",
        description:
          "True if the knowledge source contains enough information to answer the question. False if it does not.",
      },
      answer: {
        type: "string",
        description:
          "The answer to the user, written in plain language. If grounded is false, this must explain that the knowledge source does not cover the question, without guessing or using outside knowledge.",
      },
      citedSections: {
        type: "array",
        items: { type: "string", enum: validSectionIds },
        description:
          "IDs of the knowledge source sections the answer was drawn from. Empty if grounded is false.",
      },
    },
    required: ["grounded", "answer", "citedSections"],
  },
};

export interface AskResult {
  answer: string;
  grounded: boolean;
  citedSections: string[];
}

export async function askQuestion(question: string): Promise<AskResult> {
  const systemPrompt = `You are a support assistant for Bonaire Bites, a restaurant chain. Answer the user's question using ONLY the knowledge source below. Do not use any outside or general knowledge, even if you know it to be true.

Rules:
- If the knowledge source answers the question, call answer_question with grounded=true, a concise answer, and the section IDs you used.
- If the knowledge source does not contain enough information to answer, call answer_question with grounded=false, an answer that plainly says this isn't covered by the available information, and an empty citedSections array. Do not guess.
- Never invent details that aren't in the knowledge source.

Knowledge source:
${renderKnowledgeBase()}`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    tools: [ANSWER_TOOL],
    tool_choice: { type: "tool", name: "answer_question" },
    messages: [{ role: "user", content: question }],
  });

  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );

  if (!toolUse) {
    throw new Error("Claude did not return a structured answer");
  }

  const input = toolUse.input as AskResult;
  return {
    answer: input.answer,
    grounded: input.grounded,
    citedSections: input.citedSections ?? [],
  };
}
