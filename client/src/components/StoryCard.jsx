import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UseAppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { motion } from "framer-motion";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const { favorites, setFavorites, token, setShowLogin } = UseAppContext();

  const isFavorite = favorites.some((fav) => fav._id === story._id);

  const toggleFavorite = async () => {
    if (!token) {
      setShowLogin(true);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/favorites/toggle`,
        { storyId: story._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        if (data.action === "added") {
          setFavorites([...favorites, story]);
        } else {
          setFavorites(favorites.filter((fav) => fav._id !== story._id));
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
      }}
      className="group relative overflow-hidden rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-all"
    >
      {/* صورة القصة */}
      <div className="relative">
        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />

        {/* أيقونة المفضلة */}
        <motion.button
          onClick={toggleFavorite}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          className="absolute cursor-pointer top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* محتوى القصة */}
      <div className="p-4 space-y-2">
        <motion.h2
          className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1"
          whileHover={{ scale: 1.03 }}
        >
          {story.title}
        </motion.h2>

        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
          {story.type}
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {story.description}
        </p>

        <div className="pt-2 text-right">
          <motion.button
            onClick={() => navigate(`/story/${story._id}`)}
            whileHover={{ x: 3 }}
            className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
          >
            Read more →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
