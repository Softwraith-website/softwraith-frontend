import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../motion/variants";
import { Code2, Server, BookOpen, Users } from "lucide-react";

const services = [
  {
    title: "Software Development",
    description:
      "Custom software solutions built with modern technologies, focused on performance, scalability, and maintainability.",
    icon: Code2,
  },
  {
    title: "IT Services & Solutions",
    description:
      "Reliable IT support, system setup, and technical consulting tailored to business needs and growth.",
    icon: Server,
  },
  {
    title: "Industry-Oriented Training",
    description:
      "Practical, project-based training programs designed to build real-world skills and job readiness.",
    icon: BookOpen,
  },
  {
    title: "Consulting & Mentorship",
    description:
      "Technical guidance and mentoring to help individuals and teams make better engineering decisions.",
    icon: Users,
  },
];

const Services = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.25 }}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADING */}
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            What we do
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            We focus on building practical technology solutions and delivering
            meaningful learning experiences that translate into real outcomes.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="
                  group relative bg-white rounded-xl
                  border border-gray-200
                  p-6 md:p-8
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md
                  hover:border-gray-900 hover:border-l-4
                "
              >
                {/* SUBTLE PREMIUM GLOW */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* ICON */}
                <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-300 group-hover:bg-gray-200">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>

                {/* TITLE */}
                <h3 className="relative text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="relative text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Services;
