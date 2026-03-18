import { motion } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer, viewport } from '../utils/animations';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-violet-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 font-mono text-xs sm:text-sm px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          Welcome to my portfolio
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600">
            Chandan Raj
          </span>
        </motion.h1>

        {/* Role */}
        <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl text-gray-300 font-medium mb-6 tracking-wide">
          Aspiring Software Engineer
        </motion.h2>

        {/* Description */}
        <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed text-base sm:text-lg">
          Passionate about building scalable web applications and cloud solutions.
          Proficient in React, AWS, JavaScript, and C++.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 text-sm sm:text-base"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-purple-500/60 text-purple-400 hover:text-white hover:bg-purple-600 hover:border-purple-600 font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
          >
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={fadeIn} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
