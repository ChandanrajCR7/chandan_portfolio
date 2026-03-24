import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  viewport,
} from "../utils/animations";

const chandanImg = `${import.meta.env.BASE_URL}chandan.png`;

// ── Education data ────────────────────────────────────────────────────────────
const education = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    period: "Aug 2023 – Present",
    result: "CGPA: 6.21",
    resultLabel: "CGPA",
    icon: "🎓",
    current: true,
    accent: "text-purple-400",
    border: "border-purple-500/35",
    badgeBg: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
  },
  {
    institution: "KT College",
    location: "Motihari, Bihar",
    degree: "Intermediate (PCM) — Science",
    period: "Mar 2022 – May 2023",
    result: "62.2%",
    resultLabel: "Percentage",
    icon: "🏫",
    current: false,
    accent: "text-blue-400",
    border: "border-blue-500/35",
    badgeBg: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  },
  {
    institution: "Modern Public School",
    location: "Motihari, Bihar",
    degree: "Matriculation — Secondary Education",
    period: "Mar 2020 – May 2021",
    result: "50.6%",
    resultLabel: "Percentage",
    icon: "📚",
    current: false,
    accent: "text-green-400",
    border: "border-green-500/35",
    badgeBg: "bg-green-500/15 text-green-300 border border-green-500/30",
  },
];

// ── Extracurricular data ──────────────────────────────────────────────────────
const extracurricular = [
  {
    icon: "🏏",
    title: "Outdoor Sports",
    desc: "Cricket and football are my go-to. Team sports taught me coordination, staying calm under pressure, and that individual skill means nothing without teamwork.",
  },
  {
    icon: "📖",
    title: "Reading",
    desc: "Non-fiction, tech, and biographies. Reading forces clarity of thought — understanding how other people solved hard problems keeps my thinking sharp.",
  },
  {
    icon: "🤔",
    title: "Philosophy",
    desc: "Drawn to Stoicism and first-principles thinking. The habit of asking 'why' — not just 'how' — is something I bring into my engineering decisions too.",
  },
  {
    icon: "🎤",
    title: "Singing",
    desc: "Music is how I unwind. Singing helps me stay creative and emotionally balanced — a reminder that not everything needs to be optimised.",
  },
  {
    icon: "💃",
    title: "Dancing",
    desc: "I enjoy dancing as a way to express energy and stay active. It teaches rhythm, discipline, and the confidence to perform without overthinking.",
  },
  {
    icon: "🔬",
    title: "Home Lab & Tinkering",
    desc: "Experimenting with self-hosted tools, Linux configs, and side projects. The best way I learn anything new is by breaking it in a safe environment first.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function About({ theme }) {
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`py-24 ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            About Me
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* ── Row 1: Avatar + Bio ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-12">

          {/* Left — Photo */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="shrink-0 mx-auto md:mx-0"
          >
            <div className="relative" style={{ width: "260px", height: "340px" }}>
              {/* Deep purple glow blob behind the person */}
              <div
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(168,85,247,0.45) 0%, rgba(109,40,217,0.2) 50%, transparent 80%)",
                }}
              />

              {/* Photo with bottom + side fade into background */}
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 55%, transparent 100%), " +
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 55%, transparent 100%), " +
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                }}
              >
                <img
                  src={chandanImg}
                  alt="Chandan Raj"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "50% 8%" }}
                />
              </div>

              {/* Available dot */}
              <span className="absolute top-3 right-3 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span
                  className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"
                  style={{ boxShadow: "0 0 0 2px #111827" }}
                />
              </span>
            </div>
          </motion.div>

          {/* Right — Name + Title + Bio */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex-1 pt-2"
          >
            {/* Name + Title */}
            <h3 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              Chandan Raj
            </h3>
            <p className="text-purple-400 font-medium mb-5 text-sm tracking-wide">
              Aspiring Cloud Engineer · Full-Stack Developer
            </p>

            {/* Bio */}
            <div className={`space-y-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <p>
                I&apos;m a Computer Science student at Lovely Professional University, with a primary focus on
                <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}> cloud engineering and DevOps automation</span>.
                I&apos;m passionate about provisioning infrastructure on AWS, containerising workloads with Docker,
                and shipping through automated CI/CD pipelines — the kind of engineering where you build it once
                and the machine does the rest.
              </p>
              <p>
                I also bring solid full-stack skills in React and JavaScript, which gives me an end-to-end
                perspective — I understand the code I&apos;m deploying, not just the infrastructure running it.
                I believe the best cloud engineer is one who can read the application they&apos;re responsible for shipping.
              </p>
              <p>
                My goal is to build automated, self-healing cloud systems that scale without human intervention —
                and eventually, to use those skills to build something entirely my own.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Row 2: Training  |  Extracurricular ───────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Training card */}
          <motion.div variants={scaleIn}>
            <div
              className={`rounded-3xl border p-7 h-full
                ${isDark ? "bg-gray-800/50 border-amber-500/30" : "bg-amber-50/60 border-amber-200"}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: isDark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  ☕
                </span>
                <div>
                  <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                    Java Fundamentals Training
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">Skill Stone · 2 Months</p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Completed a structured 2-month training program covering core Java from the ground up —
                Object-Oriented Programming, Collections Framework, Exception Handling, and File I/O.
                The program culminated in a
                <span className={`font-semibold ${isDark ? "text-amber-300" : "text-amber-700"}`}> console-based Todo List application </span>
                as the capstone project: a fully functional task manager built entirely in Java,
                running in the terminal with complete CRUD operations. My first standalone application, built from scratch.
              </p>

              {/* Topics covered */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["OOP & Classes", "Collections", "Exception Handling", "File I/O", "Java Terminal App"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{
                      background: isDark ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.12)",
                      color: isDark ? "rgba(252,211,77,0.85)" : "#92400e",
                      border: "1px solid rgba(245,158,11,0.25)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Capstone badge */}
              <div
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{
                  background: isDark ? "rgba(245,158,11,0.07)" : "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className={`text-xs font-bold ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                    Capstone Project
                  </p>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Console Todo List — Java terminal application with full task management
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Extracurricular */}
          <motion.div variants={scaleIn}>
            <div
              className={`rounded-3xl border p-7 h-full
                ${isDark ? "bg-gray-800/50 border-gray-700/80" : "bg-gray-50 border-gray-200"}`}
            >
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Beyond the Screen
              </h3>

              <div className="space-y-5">
                {extracurricular.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span
                      className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                      }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className={`font-semibold text-sm mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.title}
                      </p>
                      <p className={`text-xs leading-relaxed ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
