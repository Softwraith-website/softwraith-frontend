import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../motion/variants";
import { Terminal, Globe, Cpu, Target } from "lucide-react";

const trainingAreas = [
  {
    title: "Software Development",
    description:
      "Hands-on training focused on building real applications using modern tools and best practices.",
    icon: Terminal,
  },
  {
    title: "Web Technologies",
    description:
      "Frontend and backend fundamentals with emphasis on clean architecture and performance.",
    icon: Globe,
  },
  {
    title: "AI & Emerging Tools",
    description:
      "Practical exposure to modern AI tools and workflows without unnecessary theory.",
    icon: Cpu,
  },
  {
    title: "Career Readiness",
    description:
      "Problem-solving, project thinking, and workflows used by real engineering teams.",
    icon: Target,
  },
];

const Training = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.25 }}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <motion.div variants={fadeUp} className="max-w-2xl mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Training built for real-world skills
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Programs designed to bridge the gap between learning and industry expectations.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {trainingAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="
                  group relative bg-white rounded-xl border border-gray-200
                  p-6 md:p-8 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md
                  hover:border-gray-900 hover:border-l-4
                "
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>

                <h3 className="relative text-xl font-semibold text-gray-900 mb-3">
                  {area.title}
                </h3>

                <p className="relative text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Training;
