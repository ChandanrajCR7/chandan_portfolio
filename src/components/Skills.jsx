import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, viewport } from '../utils/animations';

const skills = [
  {
    name: 'C++',
    level: 'Intermediate',
    icon: '⚡',
    description: 'Object-Oriented Programming, Data Structures, Algorithms, STL containers',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    badgeColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    name: 'JavaScript',
    level: 'Intermediate',
    icon: '🟨',
    description: 'ES6+, DOM Manipulation, Async/Await, REST APIs, Fetch',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    badgeColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    name: 'React',
    level: 'Intermediate',
    icon: '⚛️',
    description: 'Functional Components, Hooks, State Management, React Router, Vite',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    badgeColor: 'bg-cyan-500/20 text-cyan-300',
  },
  {
    name: 'AWS',
    level: 'Beginner',
    icon: '☁️',
    description: 'S3 Storage, CloudFront CDN, EC2, IAM Policies, Cloud Architecture',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    badgeColor: 'bg-orange-500/20 text-orange-300',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">Skills</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-md mx-auto">Technologies I work with</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={viewport} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              className={`${skill.bgColor} border ${skill.borderColor} rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl hover:border-opacity-80 transition-all duration-300 flex flex-col cursor-default`}
            >
              <div className="text-5xl mb-5">{skill.icon}</div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className={`text-xl font-bold ${skill.textColor}`}>{skill.name}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${skill.badgeColor}`}>
                  {skill.level}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
