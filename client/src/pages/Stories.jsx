import React, { useState } from "react";
import { motion } from "framer-motion";
import StoryCard from "../components/StoryCard.jsx";
import { UseAppContext } from "../context/AppContext.jsx";
import { Search } from "lucide-react";

const Stories = () => {
  const { stories } = UseAppContext();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Stories", icon: "📚", color: "gray" },
    { id: "animals", name: "Animals", icon: "🐾", color: "green" },
    { id: "fantasy", name: "Fantasy", icon: "✨", color: "purple" },
    { id: "educational", name: "Educational", icon: "📖", color: "blue" },
    { id: "adventures", name: "Adventures", icon: "🗺️", color: "orange" },
  ];

  const getCategoryStyles = (categoryColor, isSelected) => {
    const colorMap = {
      gray: {
        base: "bg-gray-100 text-gray-700 border-gray-300",
        selected: "bg-gray-500 text-white border-gray-500 shadow-lg scale-105",
        hover: "hover:bg-gray-200",
      },
      green: {
        base: "bg-green-100 text-green-700 border-green-300",
        selected:
          "bg-green-500 text-white border-green-500 shadow-lg scale-105",
        hover: "hover:bg-green-200",
      },
      purple: {
        base: "bg-purple-100 text-purple-700 border-purple-300",
        selected:
          "bg-purple-500 text-white border-purple-500 shadow-lg scale-105",
        hover: "hover:bg-purple-200",
      },
      blue: {
        base: "bg-blue-100 text-blue-700 border-blue-300",
        selected: "bg-blue-500 text-white border-blue-500 shadow-lg scale-105",
        hover: "hover:bg-blue-200",
      },
      orange: {
        base: "bg-orange-100 text-orange-700 border-orange-300",
        selected:
          "bg-orange-500 text-white border-orange-500 shadow-lg scale-105",
        hover: "hover:bg-orange-200",
      },
    };
    return isSelected
      ? colorMap[categoryColor].selected
      : `${colorMap[categoryColor].base} ${colorMap[categoryColor].hover}`;
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || story.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✨ Variants for animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        📚 Kids Stories
      </motion.h1>

      {/* Search Input */}
      <motion.div
        className="relative w-full max-w-md mb-6 mx-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500"
          size={22}
        />
        <input
          type="text"
          placeholder="Search for magical stories... ✨"
          className="w-full pl-12 pr-6 py-3.5 bg-white border-3 border-amber-300 rounded-3xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all duration-300 text-gray-800 placeholder-amber-400 shadow-xl hover:shadow-amber-300/50 font-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="max-w-4xl mx-auto mb-10 space-y-4"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold flex items-center justify-center gap-2">
          <span>🎯</span>
          <span>Choose Story Type:</span>
        </h3>

        <div className="hidden md:flex gap-3 flex-wrap justify-center">
          {categories.map((category) => (
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-2xl border-2 font-semibold transition-all duration-300 flex items-center gap-2 ${getCategoryStyles(
                category.color,
                selectedCategory === category.id
              )}`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:hidden max-w-md mx-auto">
          {categories.map((category) => (
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-4 rounded-2xl border-2 font-semibold transition-all duration-300 flex flex-col items-center gap-2 ${getCategoryStyles(
                category.color,
                selectedCategory === category.id
              )}`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results Info */}
      <motion.div
        className="max-w-4xl mx-auto mb-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
          Found{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {filteredStories.length}
          </span>{" "}
          {filteredStories.length === 1 ? "story" : "stories"}
          {selectedCategory !== "all" && (
            <span>
              {" "}
              in{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </span>
          )}
        </p>
      </motion.div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {filteredStories.map((story, i) => (
            <motion.li
              key={story._id}
              variants={fadeInUp}
              transition={{ delay: i * 0.05 }}
            >
              <StoryCard story={story} />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          className="text-center py-20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <p className="text-6xl mb-4">😔</p>
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No stories found
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Try adjusting your search or filter
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Stories;
