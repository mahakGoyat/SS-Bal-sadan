import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2, Volume2, VolumeX } from "lucide-react";
import chatbotIcon from "@/assets/chatbot-icon.webp";
import { API_BASE } from "@/lib/api";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  id: 0,
  role: "assistant",
  content:
    "Namaskar! 🙏 I'm the SS Bal Sadan School assistant. I can help you with admissions, classes, facilities, and any other questions about our school. How can I help you today?\n\n(आप हिंदी में भी पूछ सकते हैं!)",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = async (text: string) => {
    try {
      audioRef.current?.pause();
      const res = await fetch(`${API_BASE}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setSpeaking(true);
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      await audio.play();
    } catch {
      setSpeaking(false);
    }
  };

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: nextId.current++, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const firstUserIdx = messages.findIndex((m) => m.role === "user");
      const priorHistory = firstUserIdx === -1 ? [] : messages.slice(firstUserIdx);
      const history = [...priorHistory, userMsg]
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      let data: { ok: boolean; reply?: string; error?: string } = { ok: false };
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        data = (await res.json()) as typeof data;
      }

      const assistantMsg: Message = {
        id: nextId.current++,
        role: "assistant",
        content: data.ok && data.reply ? data.reply : (data.error ?? "Sorry, something went wrong. Please try again."),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!open) setUnread(true);
      if (voiceEnabled && data.ok && data.reply) {
        void speak(data.reply);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", content: "Network error. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <m.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{
              bottom: "calc(11rem + env(safe-area-inset-bottom, 0px))",
              maxHeight: "min(520px, calc(100dvh - 160px))",
            }}
          >
            {/* Header */}
            <div className="bg-[#111111] px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-none">School Assistant</p>
                <p className="text-white/60 text-xs mt-0.5">SS Bal Sadan School</p>
              </div>
              <button
                onClick={() => {
                  setVoiceEnabled((v) => {
                    if (v) {
                      audioRef.current?.pause();
                      setSpeaking(false);
                    }
                    return !v;
                  });
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
                aria-label={voiceEnabled ? "Mute voice replies" : "Enable voice replies"}
                title={voiceEnabled ? "Mute voice replies" : "Enable voice replies"}
              >
                {voiceEnabled ? (
                  <Volume2 className={`w-4 h-4 text-white ${speaking ? "animate-pulse" : ""}`} />
                ) : (
                  <VolumeX className="w-4 h-4 text-white/60" />
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-[#fafafa]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-[#111111] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#111111] text-white rounded-br-sm"
                        : "bg-white text-[#111111] border border-gray-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 bg-[#111111] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {speaking && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 flex-shrink-0 mr-2" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 italic">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>बोल रहा हूँ...</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-gray-100 bg-white flex-shrink-0 flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                disabled={loading}
                className="flex-1 text-sm px-3.5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#111111] transition-colors disabled:opacity-50 bg-[#fafafa]"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 bg-[#111111] rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div
        className="fixed right-4 sm:right-6 z-50 flex flex-col items-center gap-1.5"
        style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <AnimatePresence>
          {!open && (
            <m.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="bg-white text-[#111111] text-xs font-semibold px-2.5 py-1 rounded-full shadow-md border border-gray-200 whitespace-nowrap"
            >
              Ask me
            </m.span>
          )}
        </AnimatePresence>

        <div className="relative">
          <m.button
            onClick={() => setOpen((o) => !o)}
            whileTap={{ scale: 0.92 }}
            className="w-20 h-20 bg-transparent rounded-full shadow-xl flex items-center justify-center transition-all hover:shadow-2xl overflow-hidden"
            aria-label="Open school chatbot"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <m.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full h-full bg-[#111111] flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-white" />
                </m.span>
              ) : (
                <m.img
                  key="chat"
                  src={chatbotIcon}
                  alt="Chat with us"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full h-full object-contain"
                />
              )}
            </AnimatePresence>
          </m.button>

          {/* Unread dot */}
          {unread && !open && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          )}
        </div>
      </div>
    </>
  );
}
