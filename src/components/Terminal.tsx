import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, ShieldAlert, Play } from "lucide-react";
import {
  personalInfo,
  skillsData,
  experienceData,
  projectsData,
} from "../data";

interface LogEntry {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "system", text: "Welcome to My System Shell v3.0.0." },
    {
      type: "system",
      text: "Type 'help' or click a command below to explore this resume.",
    },
  ]);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    const nextLogs = [
      ...logs,
      { type: "input" as const, text: `guest@julius-shell ~ % ${cmd}` },
    ];

    switch (trimmedCmd) {
      case "help":
        setLogs([
          ...nextLogs,
          {
            type: "output",
            text: "Available commands:\n  help        - Display this menu\n  about       - Professional bio of Julius\n  skills      - Show full core technical stack\n  experience  - Summary of recent engineering roles\n  projects    - List major production deployments\n  contact     - Retrieve direct email, phone and profiles\n  clear       - Reset the shell buffer",
          },
        ]);
        break;
      case "about":
        setLogs([
          ...nextLogs,
          {
            type: "output",
            text: `[FULL-STACK & DEVOPS ENGINEER]\n\n${personalInfo.summary}\n\nUptime Focus: 99.9% | Code Quality: 85%+ Coverage`,
          },
        ]);
        break;
      case "skills": {
        const skillsText = skillsData
          .map(
            (category) => `• ${category.name}: ${category.skills.join(", ")}`,
          )
          .join("\n");
        setLogs([
          ...nextLogs,
          {
            type: "output",
            text: `TECHNICAL INSTALLED SKILLS:\n\n${skillsText}`,
          },
        ]);
        break;
      }
      case "experience": {
        const expText = experienceData
          .map(
            (exp) =>
              `[${exp.period}] ${exp.role} @ ${exp.company} (${exp.location})\n  Primary responsibilities included designing RBAC protocols, automated CI/CD pipeline structures, and high-frequency backend APIs.`,
          )
          .join("\n\n");
        setLogs([
          ...nextLogs,
          { type: "output", text: `PROFESSIONAL TIMELINE:\n\n${expText}` },
        ]);
        break;
      }
      case "projects": {
        const projText = projectsData
          .map(
            (p) =>
              `★ ${p.title}\n  Tech Stack: ${p.tech.slice(0, 5).join(", ")}...\n  Description: ${p.description[0].replace(/\*\*/g, "")}`,
          )
          .join("\n\n");
        setLogs([
          ...nextLogs,
          { type: "output", text: `PRODUCTION REPOSITORIES:\n\n${projText}` },
        ]);
        break;
      }
      case "contact":
        setLogs([
          ...nextLogs,
          {
            type: "output",
            text: `CONTACT CHANNELS:\n\n  Email:    ${personalInfo.email}\n  Phone:    ${personalInfo.phone}\n  GitHub:   ${personalInfo.github}\n  LinkedIn: ${personalInfo.linkedin}\n\n* Feel free to copy these details or use the floating contact card below to send an encrypted connection request!`,
          },
        ]);
        break;
      case "clear":
        setLogs([]);
        break;
      default:
        setLogs([
          ...nextLogs,
          {
            type: "error",
            text: `shell: command not found: '${cmd}'. Type 'help' to see valid operations.`,
          },
        ]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const quickCommands = [
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
    "clear",
  ];

  return (
    <div className="w-full bg-[#0c0c0e] border border-zinc-800 rounded overflow-hidden shadow-2xl font-mono text-xs text-zinc-300">
      <div className="bg-[#121214] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]/80" />
          <span className="text-[10px] text-zinc-500 pl-2 select-none uppercase tracking-wider">
            guest@bankai-shell: ~
          </span>
        </div>
        <div className="flex items-center text-zinc-400 space-x-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            Secure Port
          </span>
        </div>
      </div>

      <div className="p-4 h-[300px] overflow-y-auto space-y-3.5">
        {logs.map((log, index) => {
          if (log.type === "input") {
            return (
              <div
                id={`term-input-${index}`}
                key={index}
                className="text-[#CCFF00] flex items-start"
              >
                <span className="mr-2 font-bold select-none">➜</span>
                <span>{log.text}</span>
              </div>
            );
          }
          if (log.type === "error") {
            return (
              <div
                id={`term-err-${index}`}
                key={index}
                className="text-red-400 flex items-start pl-4 border-l border-red-500 bg-red-500/5 py-1.5 rounded"
              >
                <ShieldAlert className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                <span className="whitespace-pre-wrap">{log.text}</span>
              </div>
            );
          }
          if (log.type === "system") {
            return (
              <div
                id={`term-sys-${index}`}
                key={index}
                className="text-zinc-600 italic"
              >
                {log.text}
              </div>
            );
          }
          return (
            <div
              id={`term-out-${index}`}
              key={index}
              className="text-zinc-200 whitespace-pre-wrap pl-4 py-1.5 border-l border-zinc-800"
            >
              {log.text}
            </div>
          );
        })}
        <div ref={consoleEndRef} />
      </div>

      <div className="bg-[#121214]/60 border-t border-zinc-800 px-4 py-3 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-zinc-500 select-none mr-2 uppercase tracking-wider font-bold">
          Quick Inputs:
        </span>
        {quickCommands.map((cmd) => (
          <button
            id={`term-btn-${cmd}`}
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-[#CCFF00] text-zinc-400 hover:text-black hover:bg-[#CCFF00] transition-all duration-150 cursor-pointer uppercase font-bold"
          >
            {cmd}
          </button>
        ))}
      </div>

      <div className="bg-[#08080a] px-4 py-3 border-t border-zinc-800 flex items-center">
        <span className="text-zinc-500 font-bold mr-2 select-none">
          guest@bankai-shell ~ %
        </span>
        <input
          id="terminal-input-el"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' here..."
          className="flex-grow bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-700 font-mono caret-[#CCFF00] focus:ring-0 text-xs"
        />
        <button
          id="terminal-submit-btn"
          onClick={() => handleCommand(input)}
          className="p-1.5 rounded bg-[#CCFF00] hover:bg-white text-black transition-all cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
        </button>
      </div>
    </div>
  );
}
