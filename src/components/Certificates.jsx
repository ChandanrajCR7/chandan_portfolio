import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewport } from "../utils/animations";

const BASE = import.meta.env.BASE_URL;

const certificates = [
  {
    title: "Cloud Computing",
    issuer: "NPTEL — IIT",
    date: "2025",
    image: `${BASE}nptel.png`,
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-300",
    credentialId: "NPTEL-CC-XXXX",
    detail: "12-week course covering cloud architecture, virtualisation, AWS, scalability, and deployment models.",
    link: "#",
  },
  {
    title: "Generative AI",
    issuer: "Infosys Springboard",
    date: "2025",
    image: `${BASE}ai.png`,
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    badgeColor: "bg-purple-500/20 text-purple-300",
    credentialId: "INFOSYS-GAI-XXXX",
    detail: "Fundamentals of Generative AI, LLMs, prompt engineering, and responsible AI development practices.",
    link: "#",
  },
  {
    title: "Java Summer Training",
    issuer: "Skill Stone",
    date: "2025",
    image: `${BASE}java.png`,
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    badgeColor: "bg-amber-500/20 text-amber-300",
    credentialId: "SS-JAVA-XXXX",
    detail: "2-month intensive Java training. Covered OOP, Collections, Exception Handling & File I/O. Capstone: console Todo List.",
    link: "#",
  },
  {
    title: "Python Programming",
    issuer: "CSE Pathshala",
    date: "2024",
    image: `${BASE}python.png`,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    badgeColor: "bg-green-500/20 text-green-300",
    credentialId: "CSEP-PY-XXXX",
    detail: "Python fundamentals covering data types, functions, OOP, file handling, and introductory scripting for automation.",
    link: "#",
  },
];

function CertificateCard({ cert, theme }) {
  const isDark = theme === "dark";

  return (
    <motion.div
      variants={scaleIn}
      className={`${cert.bgColor} border ${cert.borderColor} rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl hover:border-opacity-80 transition-all duration-300 flex flex-col group`}
    >
      {/* Image */}
      <div className="relative mb-4">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-40 object-cover rounded-2xl"
        />
        <span
          className={`absolute top-2 right-2 text-xs px-2.5 py-0.5 rounded-full font-semibold ${cert.badgeColor}`}
        >
          {cert.date}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-lg font-bold mb-1 leading-snug group-hover:${cert.textColor} transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className={`text-sm font-medium mb-4 ${cert.textColor}`}>
        {cert.issuer}
      </p>

      {/* Divider */}
      <div
        className={`h-px mb-4 ${isDark ? "bg-gray-700/60" : "bg-gray-200"}`}
      />

      {/* Detail */}
      <p className={`text-xs leading-relaxed mb-3 flex-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {cert.detail}
      </p>

      {/* Credential ID */}
      <p className={`text-xs font-mono mb-5 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        ID: {cert.credentialId}
      </p>

      {/* View credential button */}
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-200 ${
          isDark
            ? "bg-gray-700/80 hover:bg-gray-600 text-white border-gray-600/50 hover:border-gray-500"
            : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 hover:border-gray-400"
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        View Credential
      </a>
    </motion.div>
  );
}

export default function Certificates({ theme }) {
  const isDark = theme === "dark";

  return (
    <section
      id="certificates"
      className={`py-24 ${isDark ? "bg-gray-950" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
            Certificates
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p
            className={`max-w-md mx-auto ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            Credentials & courses I've completed
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certificates.map((cert) => (
            <CertificateCard key={cert.title} cert={cert} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
