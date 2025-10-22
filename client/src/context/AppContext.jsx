// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   // ✅ تحميل القصص من الخادم
//   const getStories = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/story/all");
//       if (res.data.success) {
//         setStories(res.data.stories);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStories();
//   }, []);

//   // ✅ تحديث localStorage عند تغيير المستخدم أو التوكن
//   useEffect(() => {
//     if (token && user) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }
//   }, [token, user]);

//   // ✅ تسجيل الخروج
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   const value = {
//     user,
//     setUser,
//     token,
//     setToken,
//     showLogin,
//     setShowLogin,
//     stories,
//     setStories,
//     loading,
//     setLoading,
//     error,
//     setError,
//     favorites,
//     setFavorites,
//     logout, // 👈 مهم جدًا
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const UseAppContext = () => useContext(AppContext);

// //////////

// ========================================
// AppContext.jsx - النسخة المحدثة الكاملة
// ========================================
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showLogin, setShowLogin] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // ✅ تحميل القصص من الخادم
  const getStories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/story/all");
      if (res.data.success) {
        setStories(res.data.stories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ جلب المفضلات من الـ backend
  const fetchFavorites = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/user/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setFavorites(data.favorites);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // ✅ تحميل القصص عند بداية التطبيق
  useEffect(() => {
    getStories();
  }, []);

  // ✅ جلب المفضلات عند تسجيل الدخول
  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      setFavorites([]); // مسح المفضلات عند تسجيل الخروج
    }
  }, [token]);

  // ✅ تحديث localStorage عند تغيير المستخدم أو التوكن
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // ✅ تسجيل الخروج
  const logout = () => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    showLogin,
    setShowLogin,
    stories,
    setStories,
    loading,
    setLoading,
    error,
    setError,
    favorites,
    setFavorites,
    fetchFavorites, // ✅ إضافة هذه الدالة
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
