import multer from "multer";
import path from "path";
import fs from "fs";

// إنشاء مجلد مؤقت لتخزين الصور قبل رفعها إلى Cloudinary
const tempDir = "uploads/";
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export default upload;
