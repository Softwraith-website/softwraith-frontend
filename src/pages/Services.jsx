import Layout from "../components/Layout";
import {
  FiCode,
  FiGlobe,
  FiCpu,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";

const services = [
  {
    title: "Software Development",
    description:
      "Custom web and application development tailored to business needs using modern, scalable technologies.",
    icon: FiCode,
  },
  {
    title: "IT Consulting",
    description:
      "Strategic guidance to help businesses adopt the right technologies and optimize digital workflows.",
    icon: FiBriefcase,
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent solutions using AI and automation to improve efficiency and decision-making.",
    icon: FiCpu,
  },
  {
    title: "Web Development",
    description:
      "Responsive, fast, and secure websites built with modern frameworks and best practices.",
    icon: FiGlobe,
  },
  {
    title: "Technical Training",
    description:
      "Industry-focused training programs for students and professionals to build real-world skills.",
    icon: FiBookOpen,
  },
  {
    title: "Project Mentorship",
    description:
      "End-to-end mentorship for academic and startup projects, from idea validation to execution.",
    icon: FiUsers,
  },
];

export default function Services() {
  return (
    
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            We provide technology-driven solutions and training programs designed
            to help businesses and individuals grow in a digital-first world.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group
                  border border-gray-200 dark:border-gray-800
                  rounded-xl p-6
                  bg-white dark:bg-black
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-xl
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-12 h-12 mb-4
                    flex items-center justify-center
                    rounded-lg
                    bg-blue-50 dark:bg-blue-950
                    transition-colors duration-300
                  "
                >
                  <Icon
                    className="
                      text-2xl
                      text-blue-600 dark:text-blue-400
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    
  );
}
