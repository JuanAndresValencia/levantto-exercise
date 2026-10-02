import { AskForm } from "./components/AskForm";
import { ChatHistory } from "./components/ChatHistory";
import { SettingsMenu } from "./components/SettingsMenu";
import { useChat } from "./hooks/useChat";

const App = () => {
  const { question, setQuestion, loading, error, messages, sections, handleSubmit } =
    useChat();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0c0b09] p-8">
      <div className="w-full max-w-xl rounded-2xl border border-[#3a2f22] bg-[#151310] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#f0a856] to-[#b35f21]" />
          <SettingsMenu />
        </div>

        <h1 className="text-2xl font-semibold tracking-wide text-[#f6ecd9]">
          Bonaire Bites Support
        </h1>
        <p className="mt-2 mb-6 text-sm text-[#a79b86]">
          Ask a question about Bonaire Bites — hours, reservations, delivery,
          loyalty, and more.
        </p>

        <AskForm
          question={question}
          loading={loading}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
        />

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <ChatHistory messages={messages} sections={sections} loading={loading} />
      </div>
    </main>
  );
};

export default App;
