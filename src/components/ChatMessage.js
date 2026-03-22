export default function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed whitespace-pre-wrap
          ${
            isUser
              ? "bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-br-sm"
              : "bg-dark/10 text-dark dark:bg-light/10 dark:text-light rounded-bl-sm"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
