// import bcrypt from "bcrypt";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }
//     const token = generateToken(user._id.toString());
//     res.status(200).json({ success: true, message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters long",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     const token = generateToken(user._id.toString());

//     res
//       .status(201)
//       .json({ success: true, message: "User registered successfully", token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { login, register };

import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ✅ توليد التوكن مع الدور
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // تضمين الدور
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // صلاحية التوكن
  );
};

// 🟢 تسجيل الدخول
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 👈 نعيد الدور إلى الواجهة
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 التسجيل
const register = async (req, res) => {
  const { name, email, password, role } = req.body; // 👈 أضفنا role
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // 👈 افتراضي user
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// fav
// Add story to favorites
const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // من الـ auth middleware
    const { storyId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if story already in favorites
    if (user.favorites.includes(storyId)) {
      return res.status(400).json({
        success: false,
        message: "Story already in favorites",
      });
    }

    // Add story to favorites
    user.favorites.push(storyId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Story added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Remove story from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Remove story from favorites
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== storyId.toString()
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Story removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get user favorites (populated with story details)
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Toggle favorite (add if not exists, remove if exists)
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const favoriteIndex = user.favorites.findIndex(
      (id) => id.toString() === storyId.toString()
    );

    if (favoriteIndex > -1) {
      // Remove from favorites
      user.favorites.splice(favoriteIndex, 1);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Story removed from favorites",
        action: "removed",
        favorites: user.favorites,
      });
    } else {
      // Add to favorites
      user.favorites.push(storyId);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Story added to favorites",
        action: "added",
        favorites: user.favorites,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export {
  login,
  register,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  toggleFavorite,
};
