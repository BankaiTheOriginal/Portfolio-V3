import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Trash2 } from "lucide-react";
import { personalInfo } from "../data";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentMessages, setSentMessages] = useState<SavedMessage[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load sent messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Operator name required.";
    if (!email.trim()) {
      newErrors.email = "Target email endpoint required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email syntax.";
    }
    if (!message.trim())
      newErrors.message = "Payload contents cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newMessage: SavedMessage = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || "Independent Operator",
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newMessage, ...sentMessages];
    setSentMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));

    // Clear form
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setErrors({});
    setShowSuccess(true);

    // Timeout to hide success alert
    setTimeout(() => {
      setShowSuccess(false);
    }, 4500);
  };

  const deleteMessage = (id: string) => {
    const updated = sentMessages.filter((m) => m.id !== id);
    setSentMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">
            Channels
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight text-white">
            Connect
          </h3>
          <p className="text-xs text-zinc-500 mt-2 font-serif italic">
            Reach out via secure systems email, direct cellular link, or examine
            the locally sent messages log.
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <a
            id="contact-email-link"
            href={`mailto:${personalInfo.email}`}
            className="flex items-center space-x-4 p-5 rounded border border-zinc-900 bg-zinc-950/20 hover:border-[#CCFF00]/40 transition-all duration-350 block group"
          >
            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-200">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold block">
                Systems Mail
              </span>
              <span className="text-zinc-300 group-hover:text-[#CCFF00] transition-colors duration-200 font-bold">
                {personalInfo.email}
              </span>
            </div>
          </a>

          <a
            id="contact-phone-link"
            href={`tel:${personalInfo.phone}`}
            className="flex items-center space-x-4 p-5 rounded border border-zinc-900 bg-zinc-950/20 hover:border-[#CCFF00]/40 transition-all duration-350 block group"
          >
            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-200">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold block">
                Cellular Link
              </span>
              <span className="text-zinc-300 group-hover:text-[#CCFF00] transition-colors duration-200 font-bold">
                {personalInfo.phone}
              </span>
            </div>
          </a>

          <div className="flex items-center space-x-4 p-5 rounded border border-zinc-900 bg-zinc-950/20">
            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold block">
                Operational Base
              </span>
              <span className="text-zinc-300 font-bold">Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {sentMessages.length > 0 && (
          <div className="pt-6 border-t border-zinc-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 font-bold block">
                Sent Logs ({sentMessages.length})
              </span>
              <button
                id="contact-clear-all-btn"
                onClick={() => {
                  setSentMessages([]);
                  localStorage.removeItem("portfolio_messages");
                }}
                className="text-[10px] text-red-500 font-mono hover:text-red-400 font-bold uppercase tracking-wider cursor-pointer"
              >
                Clear
              </button>
            </div>
            <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-1">
              {sentMessages.map((msg) => (
                <div
                  id={`saved-msg-${msg.id}`}
                  key={msg.id}
                  className="p-4 rounded bg-zinc-950 border border-zinc-900 flex justify-between items-start gap-3"
                >
                  <div className="min-w-0 font-mono text-[10px]">
                    <span className="text-zinc-400 font-bold block truncate uppercase tracking-wider">
                      {msg.name} @ {msg.company}
                    </span>
                    <span className="text-zinc-600 block mt-0.5">
                      {msg.timestamp}
                    </span>
                    <p className="text-zinc-300 mt-2 line-clamp-3 text-xs whitespace-pre-line leading-relaxed font-sans">
                      {msg.message}
                    </p>
                  </div>
                  <button
                    id={`delete-msg-${msg.id}`}
                    onClick={() => deleteMessage(msg.id)}
                    className="p-1.5 rounded text-zinc-700 hover:text-red-500 hover:bg-zinc-900 transition-all cursor-pointer shrink-0"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-8">
        <form
          onSubmit={handleSend}
          className="p-8 md:p-10 rounded border border-zinc-900 bg-zinc-950/10 backdrop-blur-md space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-sans font-black text-white text-xl uppercase tracking-tight">
                Secure Mail Dispatcher
              </h4>
              <p className="text-xs text-zinc-500 font-serif italic mt-1">
                Compose your message. Transaction payload remains local to your
                client browser.
              </p>
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  id="contact-success-toast"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center space-x-2 text-[10px] text-black bg-[#CCFF00] px-3.5 py-1.5 rounded font-mono font-bold uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Transmitted</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label
                htmlFor="input-name"
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block"
              >
                Operator Name
              </label>
              <input
                id="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR FULL NAME"
                className={`w-full px-4 py-3.5 rounded bg-zinc-950/80 border text-zinc-100 text-xs font-mono outline-none transition-all placeholder-zinc-800 ${
                  errors.name
                    ? "border-red-500"
                    : "border-zinc-900 focus:border-[#CCFF00]"
                }`}
              />
              {errors.name && (
                <span className="text-[10px] font-mono text-red-400 block font-bold">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-email"
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block"
              >
                Target Endpoint Email
              </label>
              <input
                id="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR.EMAIL@DOMAIN.COM"
                className={`w-full px-4 py-3.5 rounded bg-zinc-950/80 border text-zinc-100 text-xs font-mono outline-none transition-all placeholder-zinc-800 ${
                  errors.email
                    ? "border-red-500"
                    : "border-zinc-900 focus:border-[#CCFF00]"
                }`}
              />
              {errors.email && (
                <span className="text-[10px] font-mono text-red-400 block font-bold">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="input-company"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block"
            >
              Organization/Company (Optional)
            </label>
            <input
              id="input-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="GOOGLE, INC."
              className="w-full px-4 py-3.5 rounded bg-zinc-950/80 border border-zinc-900 text-zinc-100 text-xs font-mono outline-none placeholder-zinc-800 focus:border-[#CCFF00] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="input-message"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block"
            >
              Message Payload
            </label>
            <textarea
              id="input-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="WRITE YOUR CONNECTION REQUEST DETAILS..."
              className={`w-full px-4 py-3.5 rounded bg-zinc-950/80 border text-zinc-100 text-xs font-mono outline-none transition-all placeholder-zinc-800 resize-none ${
                errors.message
                  ? "border-red-500"
                  : "border-zinc-900 focus:border-[#CCFF00]"
              }`}
            />
            {errors.message && (
              <span className="text-[10px] font-mono text-red-400 block font-bold">
                {errors.message}
              </span>
            )}
          </div>

          <button
            id="contact-submit-btn"
            type="submit"
            className="w-full flex items-center justify-center space-x-2.5 py-3.5 px-4 rounded bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider transition-all hover:bg-white cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Connection Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
