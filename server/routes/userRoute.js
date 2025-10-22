// import express from "express";
// import { login, register } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.post("/register", register);

// userRouter.post("/login", login);

// export default userRouter;

import express from "express";
import {
  login,
  register,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  toggleFavorite,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js"; // تأكد من المسار الصحيح

const userRouter = express.Router();

// Authentication routes (no auth required)
userRouter.post("/register", register);
userRouter.post("/login", login);

// Favorites routes (auth required)
userRouter.post("/favorites/add", authMiddleware, addToFavorites);
userRouter.post("/favorites/remove", authMiddleware, removeFromFavorites);
userRouter.get("/favorites", authMiddleware, getFavorites);
userRouter.post("/favorites/toggle", authMiddleware, toggleFavorite);

export default userRouter;
