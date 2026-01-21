import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { fadeUp, staggerContainer } from "../../motion/variants";

const CTA = () => {
    const navigate = useNavigate();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-12 md:p-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-semibold text-gray-900"
          >
            Let’s build or learn something meaningful
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Whether you’re a student looking to grow or a team looking to build,
            Softwraith is focused on practical outcomes and long-term value.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
  onClick={() => navigate("/contact")}
  className="px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
>
  Work with Softwraith
</button>

<button
  onClick={() => navigate("/services")}
  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition"
>
  Explore training programs
</button>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
