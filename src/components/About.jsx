import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewport } from '../utils/animations';

const stats = [
  { label: 'Focus', value: 'Full-Stack Development' },
  { label: 'Cloud', value: 'AWS Cloud Learner' },
  { label: 'Languages', value: 'C++, JavaScript' },
  { label: 'Status', value: 'Open to Opportunities' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar / Photo placeholder */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport} className="flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-violet-800 flex items-center justify-center shadow-2xl shadow-purple-900/60">
                <span className="text-6xl sm:text-7xl font-black text-white select-none tracking-tighter">CR</span>
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-3 rounded-3xl border border-purple-500/20 -z-10" />
              <div className="absolute -inset-6 rounded-3xl border border-purple-500/10 -z-10" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Chandan Raj
              <span className="block text-base font-normal text-purple-400 mt-1">
                Aspiring Software Engineer
              </span>
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              I'm a passionate software engineering student with a strong foundation in
              full-stack web development and cloud computing. I enjoy solving real-world
              problems through clean, efficient, and maintainable code.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              My projects span cloud-based applications on AWS to interactive web apps
              built with React. I'm actively seeking placement opportunities where I can
              contribute meaningfully, learn fast, and grow professionally.
            </p>

            {/* Stats Grid */}
            <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={scaleIn}
                  className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/80 hover:border-purple-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
                >
                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-white text-sm font-semibold">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
