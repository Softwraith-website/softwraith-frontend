import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const AuthSuccess = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="h-14 w-14 text-green-500 mb-4" />
      </motion.div>

      <h3 className="text-lg font-semibold text-gray-900">
        {message}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Redirecting…
      </p>
    </motion.div>
  );
};

export default AuthSuccess;
