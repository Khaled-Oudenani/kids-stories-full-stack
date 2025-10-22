// import React from "react";
// import { UseAppContext } from "../context/AppContext.jsx";
// import StoryCard from "../components/StoryCard.jsx";
// import { Search } from "lucide-react";
// import { useState } from "react";

// const Favorites = () => {
//   const [search, setSearch] = useState("");
//   const { favorites } = UseAppContext();
//   const filteredFavorites = favorites.filter((story) =>
//     story.title.toLowerCase().includes(search.toLowerCase())
//   );
//   return (
//     <div className="py-6 px-4">
//       <div className="relative w-full max-w-md mb-6 mx-auto">
//         <Search
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500"
//           size={22}
//         />
//         <input
//           type="text"
//           placeholder="Search for magical stories... ✨"
//           className="w-full pl-12 pr-6 py-3.5 bg-white border-3 border-amber-300 rounded-3xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all duration-300 text-gray-800 placeholder-amber-400 shadow-xl hover:shadow-amber-300/50 font-semibold"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       {filteredFavorites.length > 0 ? (
//         <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {filteredFavorites.map((story) => (
//             <StoryCard key={story.id} story={story} />
//           ))}
//         </ul>
//       ) : (
//         <div className="text-center py-20">
//           <p className="text-6xl mb-4">😔</p>
//           <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//             No favorites yet
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;

// /////////

import React, { useEffect } from "react";
import { UseAppContext } from "../context/AppContext";
import StoryCard from "../components/StoryCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites, token, setShowLogin, fetchFavorites } = UseAppContext();

  useEffect(() => {
    // التحقق من تسجيل الدخول
    if (!token) {
      setShowLogin(true);
      return;
    }
    // جلب المفضلات من الـ backend
    fetchFavorites();
  }, [token]);

  // إذا لم يكن مسجل دخول
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Please Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to login to view your favorites
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <Heart className="text-red-500 fill-red-500" />
        My Favorite Stories
      </h1>

      {favorites.length > 0 ? (
        <>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            You have{" "}
            <span className="font-bold text-red-500">{favorites.length}</span>{" "}
            favorite {favorites.length === 1 ? "story" : "stories"}
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {favorites.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </ul>
        </>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-32 h-32 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Favorites Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding stories to your favorites by clicking the heart icon
          </p>
          <button
            onClick={() => (window.location.href = "/stories")}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Browse Stories
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
