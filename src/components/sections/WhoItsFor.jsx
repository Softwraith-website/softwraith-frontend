import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../motion/variants";
import { GraduationCap, Building2, Briefcase } from "lucide-react";

const audiences = [
  {
    title: "Students",
    description:
      "Industry-aligned training with real projects and career-focused outcomes.",
    icon: GraduationCap,
  },
  {
    title: "Companies",
    description:
      "Reliable software solutions built with clarity, accountability, and scalability.",
    icon: Building2,
  },
  {
    title: "Professionals",
    description:
      "Upskilling and guidance to stay relevant in fast-moving technical roles.",
    icon: Briefcase,
  },
];

const WhoItsFor = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.25 }}
      className="bg-gray-50 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div variants={fadeUp} className="max-w-2xl mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Built for real-world impact
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We work with people and teams who care about building and growing the right way.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {audiences.map((item, index) => {
            const Icon = item.icon;

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
                  {item.title}
                </h3>

                <p className="relative text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WhoItsFor;
