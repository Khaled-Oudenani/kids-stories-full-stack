import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import LatestStories from "../components/LatestStories";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Categories />
      <LatestStories />
    </motion.div>
  );
};

export default Home;
