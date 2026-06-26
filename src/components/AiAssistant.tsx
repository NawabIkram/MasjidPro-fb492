import { useState, useRef, useEffect } from "react";
import { Bot, Copy, Send, Sparkles, X, Loader2 } from "lucide-react";
import { generateAIContent } from "../lib/gemini";
import { useLanguage } from "../i18n/i18n";

const prompts = [
  "Generate Ramadan fundraising message",
  "Show donation summary for this month",
  "Why did donations decrease this week?",
  "Create Jumuah announcement",
  "Suggest best time to send donation reminder",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function AiAssistant() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  async function handleSend(promptText: string) {
    const text = promptText.trim();
    if (!text) return;

    setInput("");
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // Pass previous chat history context to gemini (rudimentary implementation)
      const chatContext = messages.map(m => `${m.role === 'user' ? 'Admin' : 'Assistant'}: ${m.text}`).join('\n');
      const fullPrompt = `${chatContext ? `Previous Chat:\n${chatContext}\n\n` : ''}Admin: ${text}\nAssistant:`;

      const responseText = await generateAIContent(fullPrompt);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "assistant", text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", text: `Error: ${error.message}` }]);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <button className="ai-fab" type="button" onClick={() => setOpen(true)}>
        <Bot size={20} />
        Ask Masjid AI
      </button>
      {open ? (
        <div className="ai-panel" role="dialog" aria-label="Ask Masjid AI" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="ai-panel-header">
            <div>
              <span className="eyebrow">MasjidPro Assistant</span>
              <h3>Live AI Chat</h3>
            </div>
            <button type="button" className="icon-button" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-messages-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.length === 0 ? (
              <>
                <div className="ai-message" style={{ margin: 0 }}>
                  <Sparkles size={16} />
                  <p>
                    I am powered by the Gemini API and have live access to your dashboard data.
                    Ask me anything about donations, events, or staff!
                  </p>
                </div>
                <div className="prompt-grid" style={{ marginTop: '0.5rem' }}>
                  {prompts.map((prompt) => (
                    <button
                      className="prompt"
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map(msg => (
                <div key={msg.id} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#0f766e' : '#f1f5f9',
                  color: msg.role === 'user' ? 'white' : '#0f172a',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  maxWidth: '85%',
                  lineHeight: 1.5,
                  fontSize: '0.875rem'
                }}>
                  {msg.role === 'assistant' && <Bot size={14} style={{marginBottom: '4px', opacity: 0.7}}/>}
                  <div style={{whiteSpace: 'pre-wrap'}}>{msg.text}</div>
                </div>
              ))
            )}

            {isGenerating && (
              <div style={{ alignSelf: 'flex-start', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <Loader2 size={16} className="spin" /> AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input" style={{ borderTop: '1px solid #e2e8f0', padding: '1rem', margin: 0 }}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              disabled={isGenerating}
            />
            <button type="button" aria-label="Send prompt" onClick={() => handleSend(input)} disabled={isGenerating || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
