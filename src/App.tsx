import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  FileText,
  Phone,
  Server,
  Code,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

import Terminal from "./components/Terminal";
import DevOpsMetrics from "./components/DevOpsMetrics";
import SkillsCloud from "./components/SkillsCloud";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsGrid from "./components/ProjectsGrid";
import ExcellenceTabs from "./components/ExcellenceTabs";
import EducationCertifications from "./components/EducationCertifications";
import ContactForm from "./components/ContactForm";
import { personalInfo } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const date = new Date();
  // Section items for Navigation - Matching the structural sections
  const navItems = [
    { id: "overview", label: "OVERVIEW", icon: Cpu },
    { id: "metrics", label: "DEVOPS METRICS", icon: Server },
    { id: "skills", label: "SKILLS STACK", icon: Code },
    { id: "projects", label: "PROJECTS EXPLORER", icon: Layers },
    { id: "experience", label: "PROFESSIONAL TIMELINE", icon: Briefcase },
    { id: "excellence", label: "EXCELLENCE PILLARS", icon: CheckCircle },
    { id: "education", label: "EDUCATION & CERTS", icon: GraduationCap },
    { id: "contact", label: "CONTACT TERMINAL", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col selection:bg-[#CCFF00] selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-[#CCFF00]/2 rounded-full blur-[150px] pointer-events-none z-0" />

      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-900 px-6 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[#CCFF00] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full animate-pulse" />
            <span>SYSTEM CONNECTED</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-mono font-bold text-zinc-300 tracking-wider">
              {personalInfo.nickname.toUpperCase()}
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6 text-xs font-mono text-zinc-400">
          <a
            id="header-email-badge"
            href={`mailto:${personalInfo.email}`}
            className="hover:text-[#CCFF00] transition duration-200"
          >
            {personalInfo.email}
          </a>
          <span className="h-3 w-[1px] bg-zinc-850" />
          <a
            id="header-phone-badge"
            href={`tel:${personalInfo.phone}`}
            className="hover:text-[#CCFF00] transition duration-200"
          >
            {personalInfo.phone}
          </a>

          <span className="h-3 w-[1px] bg-zinc-850" />

          <div className="flex items-center space-x-4">
            <a
              id="header-github-link"
              href={personalInfo.github}
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:text-white transition text-zinc-400"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="header-linkedin-link"
              href={personalInfo.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:text-white transition text-zinc-400"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-zinc-900 bg-[#0A0A0A] relative z-30 font-mono text-xs px-6 py-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2.5 p-3 rounded border text-left cursor-pointer transition uppercase text-[10px] tracking-wider font-bold ${
                      isSelected
                        ? "bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]"
                        : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-zinc-500 text-[10px]">
              <span>VERIFIED ACCESS PORT</span>
              <div className="flex space-x-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  className="hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  className="hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex w-full relative z-10 max-w-7xl mx-auto">
        <nav className="hidden lg:block w-72 shrink-0 px-8 py-12 sticky top-[69px] h-[calc(100vh-69px)] overflow-y-auto border-r border-zinc-900 bg-[#0A0A0A]/40 backdrop-blur-xs font-mono">
          <div className="space-y-8">
            <div>
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] block mb-4">
                INDEX CONTROLS
              </span>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isSelected = activeSection === item.id;
                  return (
                    <button
                      id={`desktop-nav-${item.id}`}
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-[11px] font-bold tracking-wider transition-all duration-250 cursor-pointer text-left ${
                        isSelected
                          ? "bg-[#CCFF00]/5 text-[#CCFF00] border border-[#CCFF00]/20"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-3.5 text-[10px]">
              <span className="text-zinc-600 font-bold uppercase tracking-[0.2em] block">
                SYSTEM SPECS
              </span>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">ENGINEER:</span>
                <span className="text-zinc-300 font-bold">BANKAI</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">UPTIME:</span>
                <span className="text-[#CCFF00] font-bold">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">LOC:</span>
                <span className="text-zinc-300 font-bold">LAGOS / NGA</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow px-6 py-12 md:p-14 lg:p-16 space-y-32 overflow-x-hidden">
          <section id="overview" className="space-y-12 scroll-mt-24">
            <div className="space-y-8 relative">
              <div className="absolute top-0 right-0 hidden md:block">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#CCFF00] font-mono text-xs tracking-[0.2em] uppercase">
                <span>Based in Lagos, Nigeria</span>
                <span className="h-[1px] w-12 bg-zinc-800"></span>
                <span>
                  Active <span>{date.getFullYear()}</span>
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-5xl sm:text-7xl md:text-[85px] lg:text-[105px] font-black leading-[0.85] tracking-tighter uppercase text-white font-sans">
                  JULIUS-ATTAH
                  <br />
                  <span className="text-[#CCFF00]">
                    {personalInfo.name.split(" ")[1] || "JUSTICE"}
                  </span>
                </h2>
              </div>

              <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-tight max-w-2xl italic font-serif leading-relaxed pt-4">
                Full-Stack Software Developer & DevOps Architect crafting
                high-performance, secure backend pipelines and resilient
                production web applications.
              </p>

              <div className="flex flex-wrap gap-4 font-mono text-xs pt-4">
                <button
                  id="scroll-to-projects-btn"
                  onClick={() => scrollToSection("projects")}
                  className="px-5 py-3 rounded bg-[#CCFF00] text-black font-extrabold hover:bg-white transition duration-200 uppercase tracking-wider cursor-pointer"
                >
                  Inspect Projects
                </button>
                <button
                  id="scroll-to-contact-btn"
                  onClick={() => scrollToSection("contact")}
                  className="px-5 py-3 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition duration-200 uppercase tracking-wider cursor-pointer"
                >
                  Transmit Message
                </button>
                <a
                  id="inquire-hire-badge"
                  href={`mailto:${personalInfo.email}?subject=Inquiry%20regarding%20Full-Stack%20and%20DevOps%20role`}
                  className="px-5 py-3 rounded border border-zinc-900 text-zinc-500 hover:text-[#CCFF00] transition duration-200 uppercase tracking-wider flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inquire / Hire</span>
                </a>
              </div>
            </div>

            <div className="max-w-4xl pt-6">
              <Terminal />
            </div>
          </section>

          <section id="metrics" className="scroll-mt-24 space-y-6">
            <div className="border-t border-zinc-900 pt-16">
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block mb-2">
                  Metrics
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                  System Operations Uptime
                </h3>
              </div>
              <DevOpsMetrics />
            </div>
          </section>

          <section id="skills" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16">
              <SkillsCloud />
            </div>
          </section>

          <section id="projects" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16">
              <ProjectsGrid />
            </div>
          </section>

          <section id="experience" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16">
              <ExperienceTimeline />
            </div>
          </section>

          <section id="excellence" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16">
              <ExcellenceTabs />
            </div>
          </section>

          <section id="education" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16">
              <EducationCertifications />
            </div>
          </section>

          <section id="contact" className="scroll-mt-24">
            <div className="border-t border-zinc-900 pt-16 pb-16">
              <ContactForm />
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-zinc-900 bg-black/60 py-12 px-8 md:px-16 text-zinc-500 font-mono text-xs relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="flex gap-12">
            <div>
              <div className="text-zinc-600 mb-1 font-bold">LAT</div>
              <div className="text-zinc-400">6.5244° N</div>
            </div>
            <div>
              <div className="text-zinc-600 mb-1 font-bold">LONG</div>
              <div className="text-zinc-400">3.3792° E</div>
            </div>
            <div>
              <div className="text-zinc-600 mb-1 font-bold">PING</div>
              <div className="text-[#CCFF00] font-bold">ONLINE</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-500 uppercase tracking-widest block">
              © {new Date().getFullYear()} INDEX OF WORKS
            </span>
            <span className="text-[10px] text-zinc-600 mt-1 block">
              JULIUS-ATTAH JUSTICE CHUKWULAKA • FULL-STACK & DEVOPS
            </span>
          </div>
        </div>

        <div className="text-8xl md:text-[140px] font-black text-zinc-900/10 absolute bottom-[-40px] left-[-20px] pointer-events-none select-none tracking-tighter uppercase">
          PORTFOLIO
        </div>
      </footer>
    </div>
  );
}
