// import React from 'react';

// const CategoryFilter = ({ categories, setFilteredCategory, deleteCategory }) => {
//   return (
//     <div className="mb-4">
//       <select
//         onChange={(e) => setFilteredCategory(e.target.value)}
//         className="p-2 border rounded"
//       >
//         <option value="">All Categories</option>
//         {categories.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//             <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent dropdown from closing
//                   deleteCategory(cat);
//                 }}
//                 className="text-red-500 text-xs ml-2"
//               >
//                 🗑️
//               </button>
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default CategoryFilter;


import React, { useState } from 'react';

const CategoryFilter = ({ categories, setFilteredCategory, deleteCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4 relative">
      <button 
        onClick={toggleDropdown} 
        className="p-2 border rounded w-full text-left"
      >
        Filter by Category
      </button>
      
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded shadow-lg">
          <div className="p-2">
            <select
              onChange={(e) => {
                setFilteredCategory(e.target.value);
                setIsOpen(false); // Close dropdown after selection
              }}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {categories.map((cat) => (
              <div key={cat} className="flex justify-between items-center py-1">
                <span>{cat}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown from closing on button click
                    deleteCategory(cat);
                  }}
                  className="text-red-500 text-xs"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
