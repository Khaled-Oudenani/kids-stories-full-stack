import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { UseAppContext } from "../context/AppContext";

const Story = () => {
  const { id } = useParams(); // نأخذ ID القصة من الـ URL
  const navigate = useNavigate();
  const { stories } = UseAppContext();

  // نبحث عن القصة المطلوبة
  const story = stories.find((s) => s._id === id);

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        <p className="text-xl mb-4">❌ Story not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* زر الرجوع */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800 dark:text-blue-100">
            {story.type}
          </span>
        </div>

        {/* الصورة */}
        <img
          src={story.image}
          alt={story.title}
          className="w-full object-cover"
        />

        {/* العنوان والمحتوى */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            {story.title}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
            {story.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
