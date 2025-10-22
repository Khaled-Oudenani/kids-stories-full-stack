// ========== Dashboard.jsx ==========
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, TrendingUp, Plus } from "lucide-react";
import { UseAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { stories } = UseAppContext();

  const stats = [
    {
      title: "Total Stories",
      value: stories.length,
      icon: BookOpen,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Categories",
      value: 4,
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6 h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome Back! 👋</h1>
        <p className="text-blue-100">
          Manage your children's stories from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/owner/add-story"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={24} />
            <span className="font-semibold">Add New Story</span>
          </Link>
          <Link
            to="/owner/manage-stories"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <BookOpen size={24} />
            <span className="font-semibold">Manage Stories</span>
          </Link>
        </div>
      </div>

      {/* Recent Stories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Stories</h2>
        <div className="space-y-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{story.title}</h3>
                <p className="text-sm text-gray-500">{story.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
