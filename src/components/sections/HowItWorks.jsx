import { motion } from "framer-motion";
import { fadeUp } from "../../motion/variants";
import { Search, Code2, GraduationCap, Rocket } from "lucide-react";

const steps = [
  {
    title: "Understand the requirement",
    description:
      "We carefully analyze goals, constraints, and expectations before proposing a solution or learning path.",
    icon: Search,
  },
  {
    title: "Build or train with clarity",
    description:
      "We execute using proven workflows—either building reliable systems or delivering hands-on training.",
    icon: Code2,
  },
  {
    title: "Learn by doing",
    description:
      "Students and professionals work on practical tasks that reflect real industry scenarios.",
    icon: GraduationCap,
  },
  {
    title: "Deliver and scale",
    description:
      "We refine, deliver, and help scale solutions or skills for long-term impact.",
    icon: Rocket,
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            How it works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            A simple, structured process designed to deliver clarity,
            quality, and real-world results.
          </p>
        </motion.div>

        {/* STEPS + TIMELINE */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

          {/* TIMELINE BASE + FILL (DESKTOP ONLY) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gray-200">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px bg-gray-900"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={stepVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group bg-white rounded-xl border border-gray-200 p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-900"
              >
                {/* STEP NUMBER (DOT) */}
                <div className="absolute -top-4 left-6 md:left-1/2 md:-translate-x-1/2 h-8 w-8 rounded-full bg-gray-300 text-gray-700 text-sm font-medium flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
                  {index + 1}
                </div>

                {/* ICON */}
                <div className="mt-6 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-300 group-hover:bg-gray-200">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
