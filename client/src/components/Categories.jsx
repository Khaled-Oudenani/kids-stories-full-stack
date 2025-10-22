import React from "react";
import { motion } from "framer-motion";
import TypesCards from "./TypesCards";
import Adventures from "../assets/Adventures.png";
import Animal from "../assets/Animals.png";
import Education from "../assets/Educational.png";
import Fantasy from "../assets/fantasy.png";

const Categories = () => {
  const categories = [
    { title: "Animal", img: Animal },
    { title: "Fantasy", img: Fantasy },
    { title: "Educational", img: Education },
    { title: "adventures", img: Adventures },
  ];

  // Animation variants للعنوان
  const titleVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.6 },
    },
  };

  // Animation variants للكروت
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // تأخير بين كل card
        delayChildren: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
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
        Explore by Category
      </motion.h1>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 
            max-w-7xl mx-auto place-items-center"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={cardVariants}>
            <TypesCards category={category.title} img={category.img} />
          </motion.div>
        ))}
      </motion.ul>
    </div>
  );
};

export default Categories;
