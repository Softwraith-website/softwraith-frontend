import { motion } from "framer-motion";
import { fadeUp } from "../../motion/variants";

import studentsImg from "../../assets/student-training.jpg";
import companiesImg from "../../assets/companies-software.jpg";
import professionalsImg from "../../assets/professionals-upskilling.jpg";

const sections = [
  {
    eyebrow: "INDUSTRY-ALIGNED TRAINING",
    title: "Students",
    description:
      "Hands-on training with real-world projects, mentorship, and career-focused outcomes designed to prepare students for modern tech roles.",
    image: studentsImg,
    reverse: false,
  },
  {
    eyebrow: "RELIABLE SOFTWARE & IT SOLUTIONS",
    title: "Companies",
    description:
      "We build scalable software solutions and deliver dependable IT services with clarity, accountability, and long-term business impact.",
    image: companiesImg,
    reverse: true, // 👈 TEXT LEFT, IMAGE RIGHT
  },
  {
    eyebrow: "CAREER ADVANCEMENT",
    title: "Professionals",
    description:
      "Upskilling programs and expert guidance to help professionals stay relevant in fast-evolving technical and leadership roles.",
    image: professionalsImg,
    reverse: false,
  },
];

const WhoItsFor = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {sections.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          >
            {/* TEXT */}
            <div
              className={`max-w-xl ${
                item.reverse ? "md:order-1" : "md:order-2"
              }`}
            >
              <p className="text-sm tracking-widest text-gray-500 uppercase mb-3">
                {item.eyebrow}
              </p>

              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
                {item.title}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* IMAGE */}
            <div
              className={`flex ${
                item.reverse
                  ? "md:order-2 justify-end"
                  : "md:order-1 justify-start"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full max-w-lg
                  rounded-2xl
                  object-cover
                  shadow-[0_24px_48px_rgba(0,0,0,0.12)]
                "
              />
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default WhoItsFor;
