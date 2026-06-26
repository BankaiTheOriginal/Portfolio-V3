import { useState } from "react";
import { motion } from "motion/react";
import {
  Monitor,
  Cpu,
  Database,
  Cloud,
  GitBranch,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { skillsData } from "../data";

const CATEGORY_ICONS: Record<string, any> = {
  Frontend: Monitor,
  "Backend & APIs": Cpu,
  "Database & Caching": Database,
  "DevOps & Infrastructure": Cloud,
  "CI/CD & Version Control": GitBranch,
  "Security & Testing": ShieldCheck,
  Integrations: Layers,
};

const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Frontend: {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  "Backend & APIs": {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  "Database & Caching": {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  "DevOps & Infrastructure": {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  "CI/CD & Version Control": {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  "Security & Testing": {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
  Integrations: {
    bg: "bg-zinc-900",
    text: "text-white",
    border: "border-zinc-850",
  },
};

export default function SkillsCloud() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">
            Technical Capabilities
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight text-white">
            Core Skill Systems
          </h3>
          <p className="text-sm text-zinc-500 mt-2 font-serif italic">
            A granular breakdown of languages, runtimes, host environments, and
            pipeline workflows.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
          {skillsData.map((c) => (
            <span
              id={`skill-filter-${c.name}`}
              key={c.name}
              onMouseEnter={() => setHoveredCategory(c.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`px-3 py-1 rounded-sm border transition-all duration-200 uppercase font-bold tracking-wider cursor-default ${
                hoveredCategory === c.name
                  ? "bg-[#CCFF00] border-[#CCFF00] text-black"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
              }`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.name] || Cpu;
          const isHovered = hoveredCategory === category.name;

          return (
            <motion.div
              id={`skill-card-${category.name}`}
              key={category.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`p-6 rounded border transition-all duration-300 bg-zinc-950/20 backdrop-blur-sm ${
                isHovered
                  ? "border-[#CCFF00] bg-zinc-950 shadow-xl shadow-[#CCFF00]/2"
                  : "border-zinc-900"
              }`}
            >
              <div className="flex items-center space-x-3.5 mb-5">
                <div
                  className={`p-2.5 rounded border ${
                    isHovered
                      ? "bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  } transition-all duration-250`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                  {category.name}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    id={`skill-tag-${skill}`}
                    key={skill}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border transition-all duration-150 ${
                      isHovered
                        ? "border-zinc-850 hover:border-[#CCFF00] hover:text-[#CCFF00] text-zinc-300"
                        : "border-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
