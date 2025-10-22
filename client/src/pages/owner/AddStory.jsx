// // ========== AddStory.jsx ==========
// import React, { useState } from "react";
// import { Upload, Save, X } from "lucide-react";
// import { UseAppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const AddStory = () => {
//   const { stories, setStories } = UseAppContext();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     type: "",
//     category: "animals",
//     description: "",
//     content: "",
//     img: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);

//   const categories = [
//     { value: "animals", label: "Animals 🐾" },
//     { value: "fantasy", label: "Fantasy ✨" },
//     { value: "educational", label: "Educational 📖" },
//     { value: "adventures", label: "Adventures 🗺️" },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//         setFormData({ ...formData, img: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newStory = {
//       id: Date.now(),
//       ...formData,
//     };

//     setStories([...stories, newStory]);

//     // Reset form
//     setFormData({
//       title: "",
//       type: "",
//       category: "animals",
//       description: "",
//       content: "",
//       img: "",
//     });
//     setPreviewImage(null);

//     alert("Story added successfully! ✨");
//     navigate("/owner/manage-stories");
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//           <Upload className="text-blue-600" size={32} />
//           Add New Story
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Story Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
//               placeholder="Enter story title..."
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Story Type *
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
//             >
//               {categories.map((cat) => (
//                 <option key={cat.value} value={cat.value}>
//                   {cat.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Story Content *
//             </label>
//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               required
//               rows="8"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
//               placeholder="Write the full story here..."
//             />
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Story Image *
//             </label>
//             <div className="flex items-center gap-4">
//               <label className="flex-1 cursor-pointer">
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
//                   <div className="text-center">
//                     <Upload className="mx-auto mb-2 text-gray-400" size={32} />
//                     <p className="text-sm text-gray-600">
//                       Click to upload image
//                     </p>
//                   </div>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   required={!previewImage}
//                 />
//               </label>

//               {previewImage && (
//                 <div className="relative">
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="w-32 h-32 object-cover rounded-xl"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPreviewImage(null);
//                       setFormData({ ...formData, img: "" });
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//             >
//               <Save size={20} />
//               Save Story
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/owner/manage-stories")}
//               className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStory;

// ========== AddStory.jsx ==========
import React, { useState } from "react";
import { Upload, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "animals", // القيمة الافتراضية
    description: "",
    content: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const types = [
    { value: "animals", label: "Animals 🐾" },
    { value: "fantasy", label: "Fantasy ✨" },
    { value: "educational", label: "Educational 📖" },
    { value: "adventures", label: "Adventures 🗺️" },
  ];

  // تغيّر الحقول النصية
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // رفع الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // إرسال البيانات إلى الخادم
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields and select an image!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:3000/api/story/add", // عدّل حسب عنوان السيرفر
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert("Story added successfully! ✨");
        navigate("/owner/manage-stories");
      } else {
        alert(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding story: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Upload className="text-blue-600" size={32} />
          Add New Story
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter story title..."
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            >
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Write the story description..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Image *
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600">
                      Click to upload image
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!previewImage}
                />
              </label>

              {previewImage && (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Story"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/owner/manage-stories")}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
