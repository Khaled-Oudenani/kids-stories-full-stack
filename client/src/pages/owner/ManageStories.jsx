// // ========== ManageStories.jsx ==========
// import React, { useState } from "react";
// import { Trash2, Edit, Search } from "lucide-react";
// import { UseAppContext } from "../../context/AppContext";

// const ManageStories = () => {
//   const { stories, setStories } = UseAppContext();
//   const [search, setSearch] = useState("");

//   const filteredStories = stories.filter((story) =>
//     story.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this story?")) {
//       setStories(stories.filter((story) => story.id !== id));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Manage Stories
//         </h1>

//         {/* Search */}
//         <div className="relative">
//           <Search
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search stories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
//           />
//         </div>
//       </div>

//       {/* Stories Count */}
//       <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
//         <p className="text-gray-700 font-medium">
//           Total Stories:{" "}
//           <span className="font-bold text-blue-600">
//             {filteredStories.length}
//           </span>
//         </p>
//       </div>

//       {/* Stories List */}
//       {filteredStories.length > 0 ? (
//         <div className="grid gap-4">
//           {filteredStories.map((story) => (
//             <div
//               key={story.id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex items-center gap-4"
//             >
//               <img
//                 src={story.img}
//                 alt={story.title}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">
//                   {story.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2">
//                   {story.type} • {story.category}
//                 </p>
//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {story.description}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => alert("Edit functionality coming soon!")}
//                   className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                 >
//                   <Edit size={20} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(story.id)}
//                   className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//           <p className="text-4xl mb-4">📚</p>
//           <p className="text-xl font-semibold text-gray-600 mb-2">
//             No stories found
//           </p>
//           <p className="text-gray-500">
//             Try adjusting your search or add new stories
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageStories;

// ========== ManageStories.jsx ==========
import React, { useState, useEffect } from "react";
import { Trash2, Edit, Search } from "lucide-react";
import axios from "axios";

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // جلب القصص من السيرفر عند التحميل
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/story/all`
        );
        if (res.data.success) {
          setStories(res.data.stories);
        } else {
          console.error("Failed to fetch stories:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // فلترة القصص حسب البحث
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  // حذف القصة
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/story/remove/${id}`);
      setStories(stories.filter((story) => story._id !== id));
      alert("Story deleted successfully!");
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete story!");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-lg mt-12">
        ⏳ Loading stories...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Manage Stories
        </h1>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Stories Count */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-gray-700 font-medium">
          Total Stories:{" "}
          <span className="font-bold text-blue-600">
            {filteredStories.length}
          </span>
        </p>
      </div>

      {/* Stories List */}
      {filteredStories.length > 0 ? (
        <div className="grid gap-4">
          {filteredStories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex items-center gap-4"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{story.type}</p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {story.description}
                </p>
              </div>

              <div className="flex gap-2">
                {/* <button
                  onClick={() => alert("Edit functionality coming soon!")}
                  className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Edit size={20} />
                </button> */}
                <button
                  onClick={() => handleDelete(story._id)}
                  className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-4xl mb-4">📚</p>
          <p className="text-xl font-semibold text-gray-600 mb-2">
            No stories found
          </p>
          <p className="text-gray-500">
            Try adjusting your search or add new stories
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageStories;
