import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewport } from "../utils/animations";

const categories = [
  {
    id: "programming",
    name: "Programming",
    icon: "💻",
    headerColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/8",
    dotBg: "bg-purple-500/20",
    dotBorder: "border-purple-500/40",
    skills: [
      { name: "HTML",       icon: "🌐", level: "Proficient",    dot: "bg-green-400" },
      { name: "CSS",        icon: "🎨", level: "Proficient",    dot: "bg-green-400" },
      { name: "JavaScript", icon: "🟨", level: "Intermediate",  dot: "bg-blue-400" },
      { name: "Java",       icon: "☕", level: "Intermediate",  dot: "bg-blue-400" },
      { name: "C++",        icon: "⚡", level: "Intermediate",  dot: "bg-blue-400" },
      { name: "Python",     icon: "🐍", level: "Beginner",      dot: "bg-gray-400" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "☁️",
    headerColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/8",
    dotBg: "bg-orange-500/20",
    dotBorder: "border-orange-500/40",
    skills: [
      { name: "AWS",        icon: "☁️", level: "Learning",    dot: "bg-yellow-400" },
      { name: "Docker",     icon: "🐳", level: "Learning",    dot: "bg-yellow-400" },
      { name: "Azure",      icon: "🔷", level: "Beginner",    dot: "bg-gray-400" },
      { name: "Jenkins",    icon: "🔧", level: "Beginner",    dot: "bg-gray-400" },
      { name: "Kubernetes", icon: "⚙️", level: "Exploring",   dot: "bg-purple-400" },
      { name: "Maven",      icon: "📦", level: "Beginner",    dot: "bg-gray-400" },
      { name: "CI/CD",      icon: "🔄", level: "Learning",    dot: "bg-yellow-400" },
      { name: "Linux",      icon: "🐧", level: "Intermediate", dot: "bg-blue-400" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "🛠️",
    headerColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/8",
    dotBg: "bg-blue-500/20",
    dotBorder: "border-blue-500/40",
    skills: [
      { name: "Git",    icon: "🔀", level: "Proficient", dot: "bg-green-400" },
      { name: "GitHub", icon: "🐙", level: "Proficient", dot: "bg-green-400" },
      { name: "Linux",  icon: "🖥️", level: "Intermediate", dot: "bg-blue-400" },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: "🗄️",
    headerColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/8",
    dotBg: "bg-green-500/20",
    dotBorder: "border-green-500/40",
    skills: [
      { name: "MySQL",   icon: "🐬", level: "Intermediate", dot: "bg-blue-400" },
      { name: "MongoDB", icon: "🍃", level: "Beginner",     dot: "bg-gray-400" },
    ],
  },
];

const levelOrder = ["Proficient", "Intermediate", "Learning", "Beginner", "Exploring"];

function SkillChip({ skill, isDark }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default
        ${isDark ? "bg-gray-800/60 border-gray-700/60 text-gray-300 hover:border-gray-500" : "bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300"}`}
    >
      <span className="text-base leading-none">{skill.icon}</span>
      {skill.name}
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${skill.dot}`} title={skill.level} />
    </span>
  );
}

const levelMeta = {
  Proficient:   { color: "text-green-400",  label: "Proficient",   dot: "bg-green-400" },
  Intermediate: { color: "text-blue-400",   label: "Intermediate", dot: "bg-blue-400" },
  Learning:     { color: "text-yellow-400", label: "Learning",     dot: "bg-yellow-400" },
  Beginner:     { color: "text-gray-400",   label: "Beginner",     dot: "bg-gray-400" },
  Exploring:    { color: "text-purple-400", label: "Exploring",    dot: "bg-purple-400" },
};

export default function Skills({ theme }) {
  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      className={`py-24 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Skills
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p className={`max-w-md mx-auto ${isDark ? "text-gray-500" : "text-gray-600"}`}>
            Technologies I work with — from code to cloud
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid sm:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={scaleIn}
              className={`rounded-3xl border p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                ${isDark ? `bg-gray-800/50 ${cat.borderColor}` : `bg-white border-gray-200`}`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl border ${cat.dotBg} ${cat.dotBorder}`}
                >
                  {cat.icon}
                </span>
                <h3 className={`text-base font-bold uppercase tracking-widest ${cat.headerColor}`}>
                  {cat.name}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {levelOrder.map((lvl) => {
            const m = levelMeta[lvl];
            return (
              <span key={lvl} className="flex items-center gap-1.5 text-xs">
                <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                <span className={`font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>{m.label}</span>
              </span>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
