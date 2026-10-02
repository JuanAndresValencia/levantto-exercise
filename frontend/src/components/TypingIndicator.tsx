export const TypingIndicator = () => (
  <div className="mt-2 flex w-fit items-center gap-1.5 rounded-lg border border-[#3a2f22] bg-[#1d1a15] px-4 py-3">
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-[#e0943f]"
      style={{ animationDelay: "0ms" }}
    />
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-[#e0943f]"
      style={{ animationDelay: "150ms" }}
    />
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-[#e0943f]"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);
