import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import storyRouter from "./routes/storyRoute.js";

const app = express();

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);
app.use("/api/story", storyRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
