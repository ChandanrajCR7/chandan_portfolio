import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewport } from "../utils/animations";

// ── Learning timeline ────────────────────────────────────────────────────────
const timeline = [
  {
    period: "2022",
    title: "HTML & CSS",
    icon: "🌐",
    color: "orange",
    accent: "text-orange-400",
    border: "border-orange-500/40",
    bg: "bg-orange-500/8",
    dot: "bg-orange-400",
    ring: "ring-orange-500/30",
    description:
      "Started from the ground up — HTML document structure, CSS styling, responsive design with Flexbox and Grid. Built my first static pages and understood how the web renders.",
    tags: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design"],
  },
  {
    period: "2022–23",
    title: "JavaScript",
    icon: "🟨",
    color: "yellow",
    accent: "text-yellow-400",
    border: "border-yellow-500/40",
    bg: "bg-yellow-500/8",
    dot: "bg-yellow-400",
    ring: "ring-yellow-500/30",
    description:
      "Progressed to ES6+, DOM manipulation, event handling, async/await, and REST API consumption. JavaScript transformed static pages into living, interactive applications.",
    tags: ["ES6+", "DOM Manipulation", "Async/Await", "REST APIs", "Fetch"],
  },
  {
    period: "2023",
    title: "Java Fundamentals",
    icon: "☕",
    color: "red",
    accent: "text-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/8",
    dot: "bg-red-400",
    ring: "ring-red-500/30",
    description:
      "Completed a structured 2-month Java training program covering Object-Oriented Programming, Collections, Exception Handling, File I/O, and core data structures. Built a console-based Todo List as the capstone project — my first fully functional standalone application.",
    tags: ["OOP", "Java SE", "Collections", "Exception Handling", "File I/O"],
    highlight: { icon: "🏆", text: "2-Month Training Program · Capstone: Console Todo List" },
  },
  {
    period: "2023",
    title: "React & Frontend",
    icon: "⚛️",
    color: "cyan",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/8",
    dot: "bg-cyan-400",
    ring: "ring-cyan-500/30",
    description:
      "Moved into component-driven development with React — functional components, hooks, state management, and Vite for fast builds. Built a finance calculator, a leave management system, and this portfolio.",
    tags: ["React", "Vite", "Tailwind CSS", "Hooks", "State Management"],
  },
  {
    period: "2023–24",
    title: "AWS Cloud",
    icon: "☁️",
    color: "orange",
    accent: "text-orange-400",
    border: "border-orange-500/40",
    bg: "bg-orange-500/8",
    dot: "bg-orange-400",
    ring: "ring-orange-500/30",
    description:
      "Deployed cloud-native applications on AWS. S3 for durable object storage, CloudFront for global CDN delivery, EC2 for compute, and IAM for fine-grained access control. Understood the shift from local servers to elastic, managed infrastructure.",
    tags: ["AWS S3", "CloudFront CDN", "EC2", "IAM", "Cloud Architecture"],
  },
  {
    period: "2024",
    title: "Docker & Containerisation",
    icon: "🐳",
    color: "blue",
    accent: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-500/8",
    dot: "bg-blue-400",
    ring: "ring-blue-500/30",
    description:
      "Containerised applications with Docker — wrote Dockerfiles, built images, managed containers. Deployed the Java Todo app inside a container, eliminating the \"works on my machine\" problem entirely.",
    tags: ["Docker", "Dockerfile", "Container Images", "Docker CLI"],
  },
  {
    period: "2024",
    title: "CI/CD, Jenkins & Maven",
    icon: "⚙️",
    color: "purple",
    accent: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-500/8",
    dot: "bg-purple-400",
    ring: "ring-purple-500/30",
    description:
      "Set up Jenkins declarative pipelines and Maven build automation. Automated the entire build → test → package → deploy cycle. Touched Azure for multi-cloud awareness. Every commit now triggers the pipeline — no manual steps.",
    tags: ["Jenkins", "Maven", "Azure", "CI/CD Pipelines", "Automation"],
  },
  {
    period: "Now →",
    title: "Cloud Automation",
    icon: "🚀",
    color: "green",
    accent: "text-green-400",
    border: "border-green-500/40",
    bg: "bg-green-500/8",
    dot: "bg-green-400",
    ring: "ring-green-500/30",
    description:
      "Going deeper — AWS advanced services, Kubernetes for orchestration, infrastructure as code, and end-to-end pipeline automation. The mission: reduce human intervention in deployments to zero.",
    tags: ["AWS Advanced", "Kubernetes", "Linux", "IaC", "Automation"],
    current: true,
  },
];

// ── Education data ──────────────────────────────────────────────────────────
const education = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    period: "Aug 2023 – Present",
    result: "CGPA: 6.21",
    icon: "🎓",
    current: true,
    border: "border-purple-500/35",
    badgeBg: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
  },
  {
    institution: "KT College",
    location: "Motihari, Bihar",
    degree: "Intermediate (PCM) — Science",
    period: "Mar 2022 – May 2023",
    result: "62.2%",
    icon: "🏫",
    current: false,
    border: "border-blue-500/35",
    badgeBg: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  },
  {
    institution: "Modern Public School",
    location: "Motihari, Bihar",
    degree: "Matriculation — Secondary Education",
    period: "Mar 2020 – May 2021",
    result: "50.6%",
    icon: "📚",
    current: false,
    border: "border-green-500/35",
    badgeBg: "bg-green-500/15 text-green-300 border border-green-500/30",
  },
];

// ── Currently exploring ──────────────────────────────────────────────────────
const exploring = [
  {
    name: "AWS (Advanced)",
    icon: "☁️",
    desc: "Lambda serverless, VPC networking, RDS, CloudFormation IaC, advanced IAM",
    accent: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/8",
  },
  {
    name: "Node.js",
    icon: "🟢",
    desc: "Server-side JavaScript, REST API backends, Express framework, npm ecosystem",
    accent: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/8",
  },
  {
    name: "Nginx",
    icon: "⚡",
    desc: "Reverse proxy, load balancing, SSL termination, static file serving",
    accent: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/8",
  },
  {
    name: "Apache",
    icon: "🔥",
    desc: "HTTP server configuration, virtual hosts, .htaccess, module management",
    accent: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/8",
  },
  {
    name: "Kubernetes",
    icon: "⚙️",
    desc: "Container orchestration, pods, services, deployments, scaling strategies",
    accent: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/8",
  },
  {
    name: "React Ecosystem",
    icon: "⚛️",
    desc: "React Query, Zustand state, Next.js patterns, performance optimisation",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/8",
  },
];

// ── Currently learning ───────────────────────────────────────────────────────
const learning = [
  {
    topic: "AWS in Depth",
    icon: "☁️",
    detail: "IAM policies, VPC subnets & routing, Lambda triggers, S3 lifecycle rules, CloudWatch monitoring",
    accent: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
  },
  {
    topic: "CI/CD Automation",
    icon: "🔄",
    detail: "GitHub Actions workflows, Jenkins shared libraries, parameterised pipeline builds, automated rollbacks",
    accent: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
  },
  {
    topic: "Docker in Depth",
    icon: "🐳",
    detail: "Multi-stage builds, Docker networking, named volumes, Docker Compose for multi-container apps",
    accent: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Journey({ theme }) {
  const isDark = theme === "dark";

  return (
    <section
      id="journey"
      className={`py-24 ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ──────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            My Journey
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p className={`max-w-md mx-auto ${isDark ? "text-gray-500" : "text-gray-600"}`}>
            How I got here — and where I'm heading
          </p>
        </motion.div>

        {/* ── Learning timeline ────────────────────────────────────────────── */}
        <div className="relative mb-24">
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-px"
            style={{
              background: isDark
                ? "linear-gradient(to bottom, transparent, rgba(168,85,247,0.4) 10%, rgba(168,85,247,0.2) 90%, transparent)"
                : "linear-gradient(to bottom, transparent, rgba(168,85,247,0.3) 10%, rgba(168,85,247,0.2) 90%, transparent)",
            }}
          />

          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-8"
          >
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeLeft}
                className="relative pl-14 sm:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-4 top-1 flex items-center justify-center w-9 h-9 rounded-full ring-4 ring-offset-0
                  border border-opacity-40 z-10
                  "
                  style={{
                    background: isDark ? "#111827" : "#fff",
                    borderColor: item.current
                      ? "#22c55e"
                      : isDark ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.25)",
                    boxShadow: item.current
                      ? "0 0 0 4px rgba(34,197,94,0.15)"
                      : "0 0 0 4px rgba(168,85,247,0.08)",
                  }}
                >
                  {item.current ? (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                    </span>
                  ) : (
                    <span className="text-base leading-none">{item.icon}</span>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                    ${isDark
                      ? `bg-gray-800/50 ${item.border}`
                      : `bg-gray-50 border-gray-200 hover:border-purple-300/60`}`}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-xs font-bold uppercase tracking-widest font-mono ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {item.period}
                    </span>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                    {item.current && (
                      <span className="ml-auto text-xs px-2.5 py-0.5 rounded-full font-bold bg-green-500/15 text-green-400 border border-green-500/30">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Highlight badge (e.g. training program) */}
                  {item.highlight && (
                    <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold mb-3
                      ${isDark ? "bg-amber-500/10 text-amber-300 border border-amber-500/25" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                      <span>{item.highlight.icon}</span>
                      {item.highlight.text}
                    </div>
                  )}

                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium
                          ${isDark ? "bg-gray-700/70 text-gray-400 border border-gray-600/50" : "bg-white text-gray-600 border border-gray-200"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Currently exploring ──────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Currently Exploring
            </h3>
            <div className="w-12 h-0.5 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-3" />
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
              Technologies on my radar right now
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {exploring.map((item) => (
              <motion.div
                key={item.name}
                variants={scaleIn}
                className={`rounded-2xl border p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default
                  ${isDark ? `bg-gray-800/50 ${item.border}` : `bg-white border-gray-200`}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className={`font-bold text-base ${item.accent}`}>{item.name}</h4>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Education ───────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Education
            </h3>
            <div className="w-12 h-0.5 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-3" />
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
              Academic background
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className={`rounded-3xl border p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300
                  ${isDark ? `bg-gray-800/60 ${edu.border}` : "bg-white border-gray-200 hover:border-purple-300/60"}`}
              >
                {/* Icon + Current badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: isDark ? "rgba(168,85,247,0.12)" : "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.25)",
                    }}
                  >
                    {edu.icon}
                  </span>
                  {edu.current && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-green-500/15 text-green-400 border border-green-500/30">
                      Current
                    </span>
                  )}
                </div>

                {/* Institution */}
                <div>
                  <h4 className={`text-lg font-extrabold leading-tight mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {edu.institution}
                  </h4>
                  <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {edu.location}
                  </p>
                </div>

                {/* Degree */}
                <p className={`text-sm leading-relaxed flex-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {edu.degree}
                </p>

                {/* Footer: period + result */}
                <div className="flex items-center justify-between mt-auto pt-4"
                  style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {edu.period}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${edu.badgeBg}`}>
                    {edu.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Currently learning + Goal ────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid lg:grid-cols-5 gap-6"
        >
          {/* Currently Learning — takes 3 cols */}
          <motion.div variants={fadeLeft} className="lg:col-span-3">
            <div
              className={`h-full rounded-3xl border p-7
                ${isDark ? "bg-gray-800/50 border-gray-700/80" : "bg-gray-50 border-gray-200"}`}
            >
              <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                Currently Learning
              </h3>
              <p className={`text-xs font-mono uppercase tracking-widest mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Active focus areas
              </p>
              <div className="space-y-5">
                {learning.map((l) => (
                  <div key={l.topic} className="flex gap-4">
                    <span className="text-2xl mt-0.5 shrink-0">{l.icon}</span>
                    <div>
                      <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-bold mb-1.5 ${l.badge}`}>
                        {l.topic}
                      </span>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {l.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Goal — takes 2 cols */}
          <motion.div variants={fadeRight} className="lg:col-span-2">
            <div
              className="h-full rounded-3xl border p-7 relative overflow-hidden"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(88,28,220,0.12) 0%, rgba(30,10,80,0.4) 100%)"
                  : "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(238,230,255,0.8) 100%)",
                borderColor: isDark ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.25)",
              }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                <span className="text-3xl mb-4 block">🎯</span>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                  The Goal
                </h3>
                <p className={`text-xs font-mono uppercase tracking-widest mb-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                  Cloud Engineer
                </p>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  To become a Cloud Engineer who treats infrastructure like code — version-controlled, automated, repeatable, and always improving. I want to build pipelines that deploy themselves and systems that scale without human intervention.
                </p>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Beyond the job title — I want to use these skills to build something of my own. A product, a platform, a service — architected from scratch, running on infrastructure I designed, shipped through pipelines I built.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Automate Everything", "Own the Stack", "Ship Fast"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                      style={{
                        background: isDark ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.1)",
                        color: isDark ? "rgba(196,155,255,0.9)" : "#7c3aed",
                        border: "1px solid rgba(168,85,247,0.3)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
