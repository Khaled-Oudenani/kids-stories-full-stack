// import React from "react";

// const TypesCards = ({ category, img }) => {
//   return (
//     <li
//       className="
//         bg-white
//         shadow-md
//         rounded-2xl
//         overflow-hidden
//         hover:shadow-lg
//         transition
//         transform
//         hover:-translate-y-1
//         cursor-pointer
//         w-44 sm:w-52
//       "
//     >
//       <img src={img} alt={category} className="w-full h-32 object-cover" />
//       <div className="p-3 text-center">
//         <h3 className="text-gray-800 font-semibold text-lg">{category}</h3>
//       </div>
//     </li>
//   );
// };

// export default TypesCards;

import React from "react";
import { motion } from "framer-motion";

const TypesCards = ({ category, img }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
    >
      <img src={img} alt={category} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-center font-bold text-lg">{category}</h3>
      </div>
    </motion.div>
  );
};

export default TypesCards;
