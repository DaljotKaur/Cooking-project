import React from "react";

const CategoryDropdown = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <>
        <h2 className="text-black text-center mb-2">Category</h2>
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-black" // Change color here
            style={{ color: "black", backgroundColor: "white" }} // Change color of options
        >
            <option value="" style={{ color: "black" }}>All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category} style={{ color: "black" }}>
                    {category}
                </option>
            ))}
        </select></>
    );
};

export default CategoryDropdown;
