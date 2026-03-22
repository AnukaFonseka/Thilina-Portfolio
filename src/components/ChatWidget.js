import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";

const MESSAGE_LIMIT = 10;
const SESSION_LIMIT_MESSAGE =
  "Session limit reached. Please refresh to start a new chat.";

// F13: Generate stable IDs for messages
let _msgId = 0;
function nextId() {
  return ++_msgId;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { id, role, content }
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  // F6: Separate error state — errors never pollute conversation history
  const [sendError, setSendError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading || messageCount >= MESSAGE_LIMIT) return;
    setSendError(null); // clear any previous error on new send
    const userMessage = { id: nextId(), role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    try {
      // F6: send only role/content to the API — omit internal id field
      const apiMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "API error");
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: data.reply },
      ]);
      setMessageCount((c) => c + 1); // only increment on success
    } catch (err) {
      // F6: Show error inline above the input — never append to messages array
      setSendError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex w-80 sm:w-[calc(100vw-3rem)] h-[480px] flex-col rounded-2xl border border-dark/20 dark:border-light/20 bg-light dark:bg-dark shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-dark/10 dark:border-light/10">
            <div>
              <p className="text-sm font-bold text-dark dark:text-light">
                Portfolio Assistant
              </p>
              <p className="text-xs text-dark/50 dark:text-light/50">
                Ask me about Anuka
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-dark/60 dark:text-light/60 hover:text-dark dark:hover:text-light transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <ChatMessage
                role="assistant"
                content="Hi! I'm Anuka's portfolio assistant. Ask me anything about Anuka's skills, projects, experience, or articles."
              />
            )}
            {/* F13: stable key using message id */}
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-dark/10 dark:bg-light/10 rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark/40 dark:bg-light/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-dark/40 dark:bg-light/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-dark/40 dark:bg-light/40 animate-bounce" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-3 py-3 border-t border-dark/10 dark:border-light/10">
            {/* F6: Error shown here — not in messages state */}
            {sendError && (
              <p className="mb-2 text-xs text-red-500 dark:text-red-400 px-1">
                {sendError}
              </p>
            )}
            {messageCount >= MESSAGE_LIMIT ? (
              <p className="text-sm text-center text-dark/60 dark:text-light/40 p-4">
                {SESSION_LIMIT_MESSAGE}
              </p>
            ) : (
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isLoading}
                  maxLength={1000} // F10: aligned with server MAX_CONTENT_LENGTH
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-dark/20 dark:border-light/20 bg-dark/5 dark:bg-light/5 px-3 py-2 text-sm text-dark dark:text-light placeholder-dark/40 dark:placeholder-light/40 focus:outline-none focus:border-primary dark:focus:border-primaryDark transition-colors disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="flex-shrink-0 rounded-xl bg-primary dark:bg-primaryDark px-3 py-2 text-sm font-semibold text-light dark:text-dark hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary dark:bg-primaryDark text-light dark:text-dark shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Open portfolio assistant chat"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
