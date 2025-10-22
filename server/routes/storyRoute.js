// import express from "express";
// import { add, getAll, remove } from "../controllers/storyController.js";

// const storyRouter = express.Router();

// storyRouter.post("/add", add);

// storyRouter.get("/getAll", getAll);

// storyRouter.post("/remove", remove);

// export default storyRouter;

import express from "express";
import upload from "../middlewares/upload.js";
import { add, getAll, remove } from "../controllers/storyController.js";

const router = express.Router();

// إضافة قصة جديدة مع رفع الصورة
router.post("/add", upload.single("image"), add);

router.get("/all", getAll);
router.delete("/remove/:id", remove);

export default router;
