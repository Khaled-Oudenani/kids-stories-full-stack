import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/himg.jpg";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center m-5 p-3 gap-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-bold text-3xl"
      >
        Discover Your World
      </motion.h1>
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className="w-2/3 h-44 sm:h-60 lg:h-76 rounded-2xl shadow-2xl"
        src={heroImg}
        alt="hero-img"
      />
    </div>
  );
};

export default Hero;
