import { useMemo, useState } from "react";
import { Bot, Copy, Send, Sparkles, X } from "lucide-react";

const prompts = [
  "Generate Friday fundraising message",
  "Summarize this month's donations",
  "Create Jumuah announcement",
  "Explain why donations dropped",
  "Write Ramadan campaign message",
];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(prompts[0]);
  const [copied, setCopied] = useState(false);
  const response = useMemo(() => {
    if (selected.toLowerCase().includes("donation")) {
      return "This month shows strong recurring donor growth, but one-time gifts dipped after Friday. Recommend a short Jumuah appeal with a recurring Sadaqah CTA and a visible Ramadan campaign progress bar.";
    }
    if (selected.toLowerCase().includes("jumuah")) {
      return "Assalamu alaikum. Join us for Jumuah this Friday. Please arrive early, follow volunteer parking guidance, and consider supporting the Ramadan Fundraiser before you leave.";
    }
    return "Suggested message: Help our masjid complete this campaign with a recurring gift. Even a small weekly donation creates reliable support for families, programs, and daily operations.";
  }, [selected]);

  async function copyResponse() {
    await navigator.clipboard?.writeText(response);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <>
      <button className="ai-fab" type="button" onClick={() => setOpen(true)}>
        <Bot size={20} />
        Ask Masjid AI
      </button>
      {open ? (
        <div className="ai-panel" role="dialog" aria-label="Ask Masjid AI">
          <div className="ai-panel-header">
            <div>
              <span className="eyebrow">AI Assistant</span>
              <h3>Ask Masjid AI</h3>
            </div>
            <button type="button" className="icon-button" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="ai-message">
            <Sparkles size={16} />
            <p>
              I can help draft community messages, explain donation trends, or prepare a report
              summary for your board.
            </p>
          </div>
          <div className="prompt-grid">
            {prompts.map((prompt) => (
              <button
                className={selected === prompt ? "prompt active" : "prompt"}
                key={prompt}
                type="button"
                onClick={() => setSelected(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="ai-response">
            <span className="eyebrow">Suggested response</span>
            <p>{response}</p>
            <div className="button-row">
              <button className="secondary-button compact" type="button" onClick={copyResponse}>
                <Copy size={16} />
                {copied ? "Copied" : "Copy response"}
              </button>
              <button className="secondary-button compact" type="button">
                Use in announcement
              </button>
            </div>
          </div>
          <div className="ai-input">
            <input value={selected} onChange={(event) => setSelected(event.target.value)} />
            <button type="button" aria-label="Send prompt">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
