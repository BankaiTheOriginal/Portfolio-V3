import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Server,
  Database,
  Shield,
  Cpu,
  RefreshCw,
  Layers,
} from "lucide-react";
import { projectsData } from "../data";

// Helper to match icons to architectural terms
const getModuleIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("frontend") || t.includes("full-stack")) return Code;
  if (t.includes("backend") || t.includes("api")) return Cpu;
  if (
    t.includes("vps") ||
    t.includes("infrastructure") ||
    t.includes("dns") ||
    t.includes("ssl")
  )
    return Server;
  if (t.includes("database") || t.includes("migration")) return Database;
  if (t.includes("security") || t.includes("encryption")) return Shield;
  if (
    t.includes("caching") ||
    t.includes("performance") ||
    t.includes("session")
  )
    return RefreshCw;
  return Layers;
};

export default function ProjectsGrid() {
  // Track active module tab index for each of the 3 projects independently
  const [activeTabs, setActiveTabs] = useState<number[]>([0, 0, 0]);

  const updateTab = (projectIndex: number, tabIndex: number) => {
    const updated = [...activeTabs];
    updated[projectIndex] = tabIndex;
    setActiveTabs(updated);
  };

  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">
          Portfolio
        </span>
        <h3 className="text-3xl font-black uppercase tracking-tight text-white">
          Production Systems
        </h3>
        <p className="text-sm text-zinc-500 mt-2 font-serif italic">
          Click through the systems architecture modules below to inspect full
          production-grade details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {projectsData.map((project, pIndex) => {
          // Process bullets into structured label-detail pairs
          const modules = project.description.map((bullet) => {
            const separatorIndex = bullet.indexOf(":");
            if (separatorIndex === -1) {
              return {
                label: "General",
                content: bullet.replace(/\*\*/g, ""),
                raw: bullet,
              };
            }
            const label = bullet
              .slice(0, separatorIndex)
              .replace(/\*\*/g, "")
              .trim();
            const content = bullet.slice(separatorIndex + 1).trim();
            return { label, content, raw: bullet };
          });

          const currentTabIdx = activeTabs[pIndex];
          const currentModule = modules[currentTabIdx] || modules[0];
          const ModuleIcon = getModuleIcon(currentModule.label);

          return (
            <motion.div
              id={`project-explorer-${project.title.toLowerCase().replace(/\s/g, "-")}`}
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: pIndex * 0.1 }}
              className="bg-zinc-950/20 border border-zinc-900 rounded overflow-hidden backdrop-blur-md flex flex-col lg:flex-row shadow-2xl hover:border-zinc-800 transition-colors duration-300"
            >
              <div className="lg:w-1/3 p-8 bg-[#0C0C0E] border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#CCFF00] mb-4 uppercase font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span>SYSTEM DISPATCHED</span>
                  </div>
                  <a href={project.link} target="_blank">
                    <h4 className="text-2xl font-black text-white tracking-tight mb-2 uppercase hover:text-[#CCFF00] transition delay-150">
                      {project.title}
                    </h4>
                  </a>
                  <h4 className="text-xs font-black text-[#CCFF00] tracking-tight mb-2 uppercase">
                    {project.status}
                  </h4>

                  <p className="text-xs text-zinc-500 mb-6 font-serif italic">
                    Architectural stack setup and live production maintenance.
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 font-bold block mb-3">
                      Architectural Modules
                    </span>
                    {modules.map((mod, mIndex) => {
                      const Icon = getModuleIcon(mod.label);
                      const isSelected = currentTabIdx === mIndex;
                      return (
                        <button
                          id={`proj-${pIndex}-tab-${mIndex}`}
                          key={mod.label}
                          onClick={() => updateTab(pIndex, mIndex)}
                          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-xs font-mono transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#CCFF00]/5 border-[#CCFF00]/25 text-[#CCFF00] font-bold border"
                              : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-200"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#CCFF00]" : "text-zinc-650"}`}
                          />
                          <span className="truncate uppercase tracking-wider">
                            {mod.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-900">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600 font-bold block mb-3">
                    Primary Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        id={`proj-${pIndex}-tech-${tech}`}
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-900"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 p-8 md:p-10 flex flex-col justify-between bg-zinc-950/10">
                <div className="min-h-[220px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      id={`project-${pIndex}-content-view`}
                      key={currentTabIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                        <ModuleIcon className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>
                          {currentModule.label.toUpperCase()} COMPONENT
                        </span>
                      </div>

                      <h5 className="text-2xl font-black text-white tracking-tight uppercase">
                        {currentModule.label}
                      </h5>

                      <p className="text-zinc-300 text-sm leading-relaxed max-w-prose font-sans">
                        {currentModule.content}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 p-5 rounded bg-zinc-950/40 border border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block font-bold">
                        BUILD STATUS
                      </span>
                      <span className="text-xs font-bold text-zinc-350 uppercase">
                        Live Production Deployment Verified
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded font-bold uppercase tracking-wider">
                    SHA-256 SECURE
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
