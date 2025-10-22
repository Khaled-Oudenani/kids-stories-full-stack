import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();

  // state for login or register
  const [state, setState] = useState("login");
  const { setShowLogin, setToken, setUser } = UseAppContext();

  // state for input value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (state === "login") {
        const { data } = await axios.post(
          "http://localhost:3000/api/user/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          setShowLogin(false);
          navigate("/");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          setShowLogin(false);
          navigate("/");
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={() => setShowLogin(false)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-white text-3xl font-bold">
            {state === "login" ? "Welcome Back!" : "Join Us!"}
          </h1>
          <p className="text-blue-100 text-sm mt-2">
            {state === "login"
              ? "Sign in to continue your story journey"
              : "Create an account to start reading"}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-xl text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Name Input (Register only) */}
          {state === "register" && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password (Login only) */}
          {state === "login" && (
            <div className="mb-6 text-right">
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </>
            ) : (
              <span>{state === "login" ? "Sign In" : "Create Account"}</span>
            )}
          </button>

          {/* Toggle Login/Register */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {state === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setState((prev) => (prev === "login" ? "register" : "login"));
                setError("");
              }}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
            >
              {state === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
