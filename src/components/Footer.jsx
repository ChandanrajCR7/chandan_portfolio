import { motion } from 'framer-motion';
import { fadeIn, viewport } from '../utils/animations';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewport} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          Designed &amp; Built by{' '}
          <span className="text-purple-400 font-semibold">Chandan Raj</span>
          {' '}· {year}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-500 hover:text-white transition-colors text-sm group"
          >
            GitHub
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-500 hover:text-white transition-colors text-sm group"
          >
            LinkedIn
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="mailto:chandanraj@email.com"
            className="relative text-gray-500 hover:text-white transition-colors text-sm group"
          >
            Email
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
