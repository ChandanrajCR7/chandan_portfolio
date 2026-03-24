import { motion } from "framer-motion";
import { fadeIn, viewport } from "../utils/animations";

export default function Footer({ theme }) {
  const year = new Date().getFullYear();
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t py-8 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
          Designed &amp; Built by{" "}
          <span className="text-purple-400 font-semibold">Chandan Raj</span> ·{" "}
          {year}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative transition-colors text-sm group ${isDark ? "text-gray-500 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            GitHub
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative transition-colors text-sm group ${isDark ? "text-gray-500 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            LinkedIn
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="mailto:chandanraj@email.com"
            className={`relative transition-colors text-sm group ${isDark ? "text-gray-500 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            Email
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
