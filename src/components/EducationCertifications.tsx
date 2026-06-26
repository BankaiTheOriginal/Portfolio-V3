import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { educationData, certificationsData } from "../data";

export default function EducationCertifications() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="w-5 h-5 text-[#CCFF00]" />
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">
            Academic Background
          </h3>
        </div>

        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <motion.div
              id={`edu-item-${index}`}
              key={edu.degree}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded border border-zinc-900 bg-zinc-950/20 hover:bg-zinc-950/40 hover:border-[#CCFF00]/40 transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <h4 className="font-sans font-bold text-white text-sm uppercase">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-zinc-500 font-serif italic mt-0.5">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-900 shrink-0 font-bold">
                  {edu.period}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#CCFF00] font-mono mt-4 font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{edu.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-5 h-5 text-[#CCFF00]" />
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">
            Certifications
          </h3>
        </div>

        <div className="space-y-4">
          {certificationsData.map((cert, index) => (
            <motion.div
              id={`cert-item-${index}`}
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded border border-zinc-900 bg-zinc-950/20 hover:border-[#CCFF00]/40 transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <h4 className="font-sans font-bold text-white text-sm uppercase group-hover:text-[#CCFF00] transition-colors duration-200">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-zinc-500 font-serif italic mt-0.5">
                    Credentials & Competency Validation
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-900 shrink-0 font-bold">
                  {cert.period}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-zinc-500 font-mono mt-4 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                <span>Verified by {cert.provider}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
