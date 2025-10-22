// // import Story from "../models/Story.js";

// // const add = async (req, res) => {
// //   const { title, type, description, image } = req.body;
// //   try {
// //     if (!title || !type || !description || !image) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "All fields are required" });
// //     }
// //     const existingStory = await Story.findOne({ title });
// //     if (existingStory) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "Story already exists" });
// //     }
// //     const story = await Story.create({
// //       title,
// //       type,
// //       description,
// //       image,
// //     });
// //     res
// //       .status(201)
// //       .json({ success: true, message: "Story added successfully", story });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // const getAll = async (req, res) => {
// //   try {
// //     const stories = await Story.find();
// //     res.status(200).json({ success: true, stories });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // const remove = async (req, res) => {
// //   const { title } = req.body;
// //   try {
// //     const story = await Story.findOneAndDelete({ title });
// //     if (!story) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Story not found" });
// //     }
// //     res
// //       .status(200)
// //       .json({ success: true, message: "Story removed successfully" });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // export { add, getAll, remove };

// import Story from "../models/Story.js";
// import cloudinary from "../configs/cloudinary.js"; // استيراد إعدادات Cloudinary

// // إضافة قصة جديدة
// const add = async (req, res) => {
//   try {
//     const { title, type, description } = req.body;

//     // تأكد من أن البيانات الأساسية موجودة
//     if (!title || !type || !description) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     // تحقق من عدم وجود القصة مسبقًا
//     const existingStory = await Story.findOne({ title });
//     if (existingStory) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Story already exists" });
//     }

//     // تحقق من رفع الصورة
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Image file is required" });
//     }

//     // رفع الصورة إلى Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "stories",
//     });

//     // إنشاء القصة الجديدة بعد رفع الصورة
//     const story = await Story.create({
//       title,
//       type,
//       description,
//       image: uploadResult.secure_url, // رابط الصورة من Cloudinary
//     });

//     res.status(201).json({
//       success: true,
//       message: "Story added successfully",
//       story,
//     });
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // جلب جميع القصص
// const getAll = async (req, res) => {
//   try {
//     const stories = await Story.find();
//     res.status(200).json({ success: true, stories });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // حذف قصة حسب العنوان
// const remove = async (req, res) => {
//   const { title } = req.body;
//   try {
//     const story = await Story.findOneAndDelete({ title });
//     if (!story) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Story not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Story removed successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { add, getAll, remove };

import Story from "../models/Story.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";

// إضافة قصة جديدة
const add = async (req, res) => {
  try {
    const { title, type, description } = req.body;

    if (!title || !type || !description || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // رفع الصورة إلى Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "stories",
    });

    // حذف الصورة من المجلد المؤقت
    fs.unlinkSync(req.file.path);

    // إنشاء القصة
    const story = await Story.create({
      title,
      type,
      description,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Story added successfully",
      story,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// جلب جميع القصص
const getAll = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({ success: true, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف قصة
const remove = async (req, res) => {
  try {
    const { id } = req.params; // نأخذ الـ id من الرابط وليس body

    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Story removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { add, getAll, remove };
