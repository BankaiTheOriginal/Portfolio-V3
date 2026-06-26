import { motion } from "motion/react";
import { Server, Activity, ShieldAlert, KeyRound, Radio } from "lucide-react";
import { excellenceData } from "../data";

const PILLAR_ICONS: Record<number, any> = {
  0: Server,        // Infrastructure & Deployment Excellence
  1: Activity,      // Database & Performance Optimization
  2: ShieldAlert,   // Security & Compliance Implementation
  3: KeyRound,      // Third-Party Integrations & Testing
};

export default function ExcellenceTabs() {
  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">Architectural Standard</span>
        <h3 className="text-3xl font-black uppercase tracking-tight text-white">
          Systemic Pillars of Excellence
        </h3>
        <p className="text-sm text-zinc-500 mt-2 font-serif italic">
          High-performance outcomes, secure RBAC configurations, and production metrics achieved across systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {excellenceData.map((pillar, index) => {
          const Icon = PILLAR_ICONS[index] || Radio;
          
          return (
            <motion.div
              id={`excellence-pillar-${index}`}
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-8 rounded border border-zinc-900 bg-zinc-950/20 backdrop-blur-md flex flex-col justify-between hover:border-zinc-800 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-[#CCFF00]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-black text-white text-base uppercase tracking-tight">
                    {pillar.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {pillar.bullets.map((bullet, bIndex) => (
                    <div
                      id={`pillar-bullet-${index}-${bIndex}`}
                      key={bIndex}
                      className="flex items-start text-xs text-zinc-300 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full mt-2.5 mr-3 shrink-0 bg-[#CCFF00]" />
                      <span>
                        {bullet.split(/(\b99\.9%\b|\b1000\+\b|\b70%\b|\b3 production applications\b|\bzero downtime\b|\b40-60%\b|\b60%\+\b|\b100%\b|\b6 distinct\b|\b85%\+\b)/g).map((part, pIdx) => {
                          const isBold = [
                            "99.9%", "1000+", "70%", "3 production applications", "zero downtime",
                            "40-60%", "60%+", "100%", "6 distinct", "85%+"
                          ].includes(part);
                          
                          return isBold ? (
                            <span key={pIdx} className="font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/5 px-1 rounded">
                              {part}
                            </span>
                          ) : (
                            part
                          );
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-wider">
                <span>VERIFICATION PASSED</span>
                <span className="text-[#CCFF00]">SYSTEM CERTIFIED</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
