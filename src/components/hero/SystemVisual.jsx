import { motion } from "framer-motion";

const boxVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const SystemVisual = () => {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">
      <motion.div
        variants={boxVariants}
        animate="animate"
        className="absolute w-40 h-24 rounded-xl border border-gray-300 bg-white shadow-sm"
      />
      <motion.div
        variants={boxVariants}
        animate="animate"
        className="absolute w-32 h-20 rounded-xl border border-gray-200 bg-white translate-x-28 translate-y-16 shadow-sm"
      />
      <motion.div
        variants={boxVariants}
        animate="animate"
        className="absolute w-28 h-16 rounded-xl border border-gray-200 bg-white -translate-x-28 translate-y-20 shadow-sm"
      />
    </div>
  );
};

export default SystemVisual;
