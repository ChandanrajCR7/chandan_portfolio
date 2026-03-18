import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewport } from '../utils/animations';

const projects = [
  {
    title: 'AWS Photo Gallery',
    emoji: '📸',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    accentColor: 'text-orange-400',
    problem:
      'Storing and serving images efficiently at scale, without managing servers, is a real challenge in modern web applications.',
    solution:
      'Built a cloud-native photo gallery using AWS S3 for durable object storage and CloudFront CDN for fast, low-latency global delivery.',
    techStack: ['AWS S3', 'CloudFront', 'React', 'JavaScript'],
    features: [
      'Fast global delivery via CloudFront CDN',
      'Scalable and secure image storage with S3',
      'Responsive masonry/grid gallery layout',
      'Image upload with live preview',
    ],
    screenshots: [
      { label: 'Gallery View', gradient: 'from-orange-900 via-orange-800 to-amber-900', icon: '🖼️' },
      { label: 'Upload Panel', gradient: 'from-amber-900 via-orange-900 to-red-900', icon: '☁️' },
      { label: 'CloudFront CDN', gradient: 'from-red-900 via-orange-800 to-yellow-900', icon: '⚡' },
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Finance Calculator',
    emoji: '💰',
    tagColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    accentColor: 'text-green-400',
    problem:
      'Users struggle with manual financial calculations like EMI, compound interest, and investment returns — leading to poor financial planning.',
    solution:
      'Developed an interactive multi-tool finance calculator with real-time results, multiple financial modes, and an intuitive UI.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS'],
    features: [
      'EMI calculator with full amortization breakdown',
      'Compound interest & SIP investment planner',
      'Lump-sum vs SIP return comparison',
      'Instant real-time calculation on input',
    ],
    screenshots: [
      { label: 'EMI Calculator', gradient: 'from-green-900 via-emerald-900 to-teal-900', icon: '🧮' },
      { label: 'SIP Planner', gradient: 'from-teal-900 via-green-900 to-cyan-900', icon: '📈' },
      { label: 'Comparison Chart', gradient: 'from-emerald-900 via-teal-800 to-green-900', icon: '📊' },
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Employee Leave Management',
    emoji: '🗂️',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    accentColor: 'text-blue-400',
    problem:
      'Managing employee leave requests manually through spreadsheets or email chains is time-consuming, error-prone, and lacks transparency.',
    solution:
      'Built a full-stack web application that fully digitizes the leave request and admin approval workflow with a clean dashboard.',
    techStack: ['React', 'JavaScript', 'Node.js', 'REST API'],
    features: [
      'Employee self-service leave application portal',
      'Admin panel for approval, rejection & comments',
      'Real-time leave balance tracking per employee',
      'Leave history with date filters and status tags',
    ],
    screenshots: [
      { label: 'Dashboard', gradient: 'from-blue-900 via-indigo-900 to-blue-900', icon: '📋' },
      { label: 'Apply Leave', gradient: 'from-indigo-900 via-blue-900 to-sky-900', icon: '📝' },
      { label: 'Admin Panel', gradient: 'from-sky-900 via-blue-900 to-indigo-900', icon: '⚙️' },
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'C++ Shopping Cart',
    emoji: '🛒',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accentColor: 'text-purple-400',
    problem:
      'Demonstrating real-world application of Object-Oriented Programming concepts in C++ beyond simple textbook examples.',
    solution:
      'Designed a modular console-based shopping cart system using OOP principles — encapsulation, inheritance, polymorphism, and file I/O.',
    techStack: ['C++', 'OOP', 'File I/O', 'STL'],
    features: [
      'Add, remove, and update cart items dynamically',
      'Dynamic pricing with discount and coupon logic',
      'File-based persistent cart and product storage',
      'Clean class hierarchy demonstrating OOP design',
    ],
    screenshots: [
      { label: 'Product List', gradient: 'from-purple-900 via-violet-900 to-purple-900', icon: '📦' },
      { label: 'Cart View', gradient: 'from-violet-900 via-purple-900 to-fuchsia-900', icon: '🛒' },
      { label: 'Checkout', gradient: 'from-fuchsia-900 via-violet-900 to-purple-900', icon: '✅' },
    ],
    github: '#',
    demo: '#',
  },
];

// Lightbox modal shown when user clicks a thumbnail
function Lightbox({ screenshots, activeIndex, onClose, onPrev, onNext }) {
  const shot = screenshots[activeIndex];

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className={`bg-gradient-to-br ${shot.gradient} rounded-2xl aspect-video flex flex-col items-center justify-center shadow-2xl`}>
          <span className="text-7xl mb-4">{shot.icon}</span>
          <p className="text-white/80 text-lg font-semibold tracking-wide">{shot.label}</p>
          <p className="text-white/40 text-xs mt-1 font-mono">
            Replace with real screenshot
          </p>
        </div>

        {/* Caption + counter */}
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-white font-semibold">{shot.label}</p>
          <p className="text-gray-500 text-sm">{activeIndex + 1} / {screenshots.length}</p>
        </div>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          aria-label="Previous screenshot"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          aria-label="Next screenshot"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {screenshots.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to screenshot ${i + 1}`}
              onClick={() => {/* handled via onPrev/onNext pattern — dots are visual only here */}}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === activeIndex ? 'bg-purple-500 w-5' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenshotGallery({ screenshots, accentColor }) {
  const [lightbox, setLightbox] = useState(null); // null | index

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() =>
    setLightbox((i) => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next = useCallback(() =>
    setLightbox((i) => (i + 1) % screenshots.length), [screenshots.length]);

  return (
    <>
      <div className="mb-5">
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${accentColor}`}>
          Screenshots
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {screenshots.map((shot, i) => (
            <button
              key={shot.label}
              onClick={() => setLightbox(i)}
              className="group/thumb relative overflow-hidden rounded-xl aspect-video focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`View screenshot: ${shot.label}`}
            >
              {/* Thumbnail gradient (swap the div for an <img> when you have real screenshots) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} transition-transform duration-500 group-hover/thumb:scale-110`}
              />
              {/* Icon overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="text-xl drop-shadow">{shot.icon}</span>
              </div>
              {/* Label on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 translate-y-full group-hover/thumb:translate-y-0 transition-transform duration-300">
                <p className="text-white text-[10px] font-medium text-center px-1 truncate">
                  {shot.label}
                </p>
              </div>
              {/* Zoom icon indicator */}
              <div className="absolute top-1 right-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200">
                <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          screenshots={screenshots}
          activeIndex={lightbox}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="bg-gray-800/60 border border-gray-700/80 rounded-3xl p-7 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/25 hover:border-purple-500/40 transition-all duration-300 flex flex-col group">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{project.emoji}</span>
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
          {project.title}
        </h3>
      </div>

      {/* Screenshot Gallery */}
      <ScreenshotGallery screenshots={project.screenshots} accentColor={project.accentColor} />

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`text-xs px-3 py-1 rounded-full border font-medium ${project.tagColor}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Problem */}
      <div className="mb-4">
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${project.accentColor}`}>
          Problem
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">{project.problem}</p>
      </div>

      {/* Solution */}
      <div className="mb-4">
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${project.accentColor}`}>
          Solution
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
      </div>

      {/* Features */}
      <div className="mb-6 flex-1">
        <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${project.accentColor}`}>
          Key Features
        </h4>
        <ul className="space-y-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-purple-500 mt-0.5 shrink-0 text-xs">▸</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 bg-gray-700/80 hover:bg-gray-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-600/50 hover:border-gray-500"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-purple-900/30 hover:shadow-purple-700/40 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-md mx-auto">Things I've built — problems I've solved</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={viewport} className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
