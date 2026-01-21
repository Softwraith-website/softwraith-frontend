import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../motion/variants";
import heroVisual from "../../assets/hero-system.svg";

const Hero = () => {
    const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* LEFT CONTENT */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight"
        >
          Building practical tech solutions <br />
          <span className="text-gray-600">
            and future-ready talent
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-gray-600 max-w-xl"
        >
          Softwraith Solutions Private Limited delivers reliable software
          development, IT services, and industry-oriented training programs to
          help businesses and individuals grow in the digital era.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4"
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
  Explore Training
</button>

        </motion.div>
      </motion.div>

      {/* RIGHT VISUAL (SVG) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center md:justify-end"
      >
        <motion.img
          src={heroVisual}
          alt="Softwraith platform workflow illustration"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

    </section>
  );
};

export default Hero;
