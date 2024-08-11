const RecipeCard = ({ name, category, image, instructions, isBookmarked, onBookmark }) => {
    return (
        <li className="flex flex-row items-center border border-gray-300 rounded-lg drop-shadow-md p-4 gap-4 bg-orange-200 hover:bg-orange-300 my-2 hover:drop-shadow-xl">
            <div>
                <img src={image} alt={name} className="w-24 h-auto rounded-md" />
            </div>
            <div className="flex-1">
                <h2 className="text-xl text-orange-700 font-semibold mb-2">{name}</h2>
                <p className="text-gray-600 mb-2">{category}</p>
                <p className="text-gray-700">{instructions.substring(0, 100)}...</p>
            </div>
            <button
                className={`p-2 rounded-full ${isBookmarked ? "bg-red-500" : "bg-gray-300"} hover:bg-red-700 text-white`}
                onClick={(e) => {
                    e.stopPropagation(); 
                    onBookmark(); 
                }}
            >
                {isBookmarked ? "Unbookmark" : "Bookmark"}
            </button>
        </li>
    );
};

export default RecipeCard;
