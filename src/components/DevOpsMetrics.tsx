import { motion } from "motion/react";
import { Server, Zap, Shield, CheckCircle } from "lucide-react";

export default function DevOpsMetrics() {
  const metrics = [
    {
      id: "metric-uptime",
      label: "Uptime Achieved",
      value: "99.9%",
      description:
        "Across multiple production systems on self-hosted Ubuntu VPS configurations.",
      icon: Server,
      color: "group-hover:text-[#CCFF00]",
      borderColor: "border-zinc-800 hover:border-zinc-700",
      textColor: "text-zinc-400 group-hover:text-[#CCFF00]",
    },
    {
      id: "metric-performance",
      label: "Performance Uplift",
      value: "60%+",
      description:
        "Speed improvements via optimized Redis caching layers and PostgreSQL connection pooling.",
      icon: Zap,
      color: "group-hover:text-[#CCFF00]",
      borderColor: "border-zinc-800 hover:border-zinc-700",
      textColor: "text-zinc-400 group-hover:text-[#CCFF00]",
    },
    {
      id: "metric-deployment",
      label: "Deployment Speedup",
      value: "70%",
      description:
        "Reduction in deployment times using streamlined GitHub Actions CI/CD pipelines.",
      icon: CheckCircle,
      color: "group-hover:text-[#CCFF00]",
      borderColor: "border-zinc-800 hover:border-zinc-700",
      textColor: "text-zinc-400 group-hover:text-[#CCFF00]",
    },
    {
      id: "metric-coverage",
      label: "Test Coverage",
      value: "85%+",
      description:
        "Robust testing with Jest for critical business logic, ensuring safe enterprise deployments.",
      icon: Shield,
      color: "group-hover:text-[#CCFF00]",
      borderColor: "border-zinc-800 hover:border-zinc-700",
      textColor: "text-zinc-400 group-hover:text-[#CCFF00]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, index) => {
        const Icon = m.icon;
        return (
          <motion.div
            id={m.id}
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`relative p-8 rounded border ${m.borderColor} bg-zinc-950/40 backdrop-blur-sm overflow-hidden glow-card group transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-[#CCFF00]/0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center gap-4 mb-6">
                <span className="text-[9px] font-mono text-zinc-500 tracking-[0.2em] uppercase font-bold">
                  SYSTEM METRIC
                </span>
                <div
                  className={`p-2 rounded bg-zinc-900 border border-zinc-800 ${m.textColor} transition-colors duration-250`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-4xl font-sans font-black text-white tracking-tighter mb-1.5 uppercase group-hover:text-[#CCFF00] transition-colors duration-250">
                  {m.value}
                </h4>
                <h5 className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase mb-2">
                  {m.label}
                </h5>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  {m.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
