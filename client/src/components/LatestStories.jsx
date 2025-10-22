import React from "react";
import { motion } from "framer-motion";
import StoryCard from "../components/StoryCard.jsx";
import { UseAppContext } from "../context/AppContext";

const LatestStories = () => {
  const { stories } = UseAppContext();

  // ✅ عكس الترتيب وأخذ آخر 3 قصص
  const lastStories = stories.slice().reverse().slice(0, 3);

  // Animation variants
  const titleVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 1.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.4,
      },
    },
  };

  const storyVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-start m-5 p-3 gap-4 px-10">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="font-bold text-xl"
      >
        Latest Stories
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {lastStories.map((story) => (
          <motion.div key={story._id} variants={storyVariants}>
            <StoryCard story={story} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestStories;
