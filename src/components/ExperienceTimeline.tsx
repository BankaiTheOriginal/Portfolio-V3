import { motion } from "motion/react";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experienceData } from "../data";

export default function ExperienceTimeline() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">
            History
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight text-white">
            Professional Experience
          </h3>
          <p className="text-sm text-zinc-500 mt-2 font-serif italic">
            A chronological timeline of core engineering roles, full-stack, and
            infrastructure contributions.
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-[10px] font-mono text-[#CCFF00] bg-[#CCFF00]/5 px-3 py-1.5 rounded border border-[#CCFF00]/20 font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <span>Active & Open to Proposals</span>
        </div>
      </div>

      <div className="relative pl-6 md:pl-10 border-l border-zinc-900 space-y-12">
        {experienceData.map((job, index) => {
          const isLatest = index === 0;
          return (
            <motion.div
              id={`experience-block-${job.company.toLowerCase().replace(/\s/g, "-")}`}
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    isLatest
                      ? "bg-[#CCFF00] border-[#CCFF00] shadow-lg shadow-[#CCFF00]/50"
                      : "bg-zinc-950 border-zinc-800"
                  }`}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h4 className="text-xl font-black uppercase text-white tracking-tight">
                      {job.role}
                    </h4>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#CCFF00]">
                      @{job.company}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono text-zinc-500">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-zinc-600" />
                      {job.period}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-zinc-600" />
                      {job.location}
                    </span>
                  </div>
                </div>

                {isLatest && (
                  <span className="inline-flex self-start md:self-auto text-[10px] font-mono tracking-widest font-bold uppercase text-[#CCFF00] bg-[#CCFF00]/5 border border-[#CCFF00]/10 px-2 py-0.5 rounded">
                    Current Role
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 bg-zinc-950/20 border border-zinc-900 p-6 rounded-sm">
                {job.bullets.map((bullet, bIndex) => (
                  <div
                    id={`job-bullet-${index}-${bIndex}`}
                    key={bIndex}
                    className="flex items-start text-sm text-zinc-350 leading-relaxed group"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-3 mt-1 shrink-0 text-zinc-700 group-hover:text-[#CCFF00] transition-colors duration-200" />
                    <span>
                      {bullet
                        .split(
                          /(\bJWT\b|\bMFA\b|\bGraphQL\b|\bREST APIs\b|\bSwagger\b|\bDocker\b|\bRedis\b|\bCSV\b|\bSage Pastel 50C\b|\bZoho Books\b|\bonline examination\b|\brouters and servers\b|\bNginx\b|\bUbuntu\b)/g,
                        )
                        .map((part, pIdx) => {
                          const isKeyword = [
                            "JWT",
                            "MFA",
                            "GraphQL",
                            "REST APIs",
                            "Swagger",
                            "Docker",
                            "Redis",
                            "CSV",
                            "Sage Pastel 50C",
                            "Zoho Books",
                            "online examination",
                            "routers and servers",
                            "Nginx",
                            "Ubuntu",
                          ].includes(part);

                          return isKeyword ? (
                            <span
                              key={pIdx}
                              className="text-[#CCFF00] font-bold font-mono px-1 rounded bg-[#CCFF00]/5"
                            >
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
