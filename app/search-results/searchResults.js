"use client";

import { useState, useEffect } from "react";
import AppHeader from "@/components/header";
import RecipeCard from "@/components/recipieCard";
import RecipeModal from "@/components/recipieModal";
import CategoryDropdown from "@/components/CategoryDropdown";
import AreaDropdown from "@/components/AreaDropdown";

const SearchResults = () => {
    const [recipies, setRecipies] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    useEffect(() => {
        const fetchAllRecipes = async () => {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            const data = await response.json();
            setRecipies(data.meals);
        };

        const fetchCategories = async () => {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
            const data = await response.json();
            setCategories(data.categories.map(cat => cat.strCategory));
        };

        const fetchAreas = async () => {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
            const data = await response.json();
            setAreas(data.meals.map(area => area.strArea));
        };

        fetchAllRecipes(); // Fetch all recipes on component mount
        fetchCategories();
        fetchAreas();
    }, []);

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setModalIsOpen(false);
    };

    const toggleBookmark = (recipe) => {
        const isBookmarked = bookmarkedRecipes.some(
            (r) => r.idMeal === recipe.idMeal
        );
        if (isBookmarked) {
            setBookmarkedRecipes(
                bookmarkedRecipes.filter((r) => r.idMeal !== recipe.idMeal)
            );
        } else {
            setBookmarkedRecipes([...bookmarkedRecipes, recipe]);
        }
    };

    // Filter recipes based on selected filters
    const filteredRecipes = recipies.filter(recipe => {
        const categoryMatch = selectedCategory ? recipe.strCategory === selectedCategory : true;
        const areaMatch = selectedArea ? recipe.strArea === selectedArea : true;
        return categoryMatch && areaMatch;
    });

    return (
        <div className="w-full">
            <AppHeader setRecipies={setRecipies} />
            <h1 className="text-3xl font-bold text-center mt-8 text-black">Recipes</h1>

            <h1 className="text-black text-2xl">Filters</h1>
            <div className="flex gap-4 mb-4">
                <CategoryDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <AreaDropdown
                    areas={areas}
                    selectedArea={selectedArea}
                    setSelectedArea={setSelectedArea}
                />
            </div>

            <ul className="flex flex-col gap-4 mt-4 hover:cursor-pointer">
                {filteredRecipes.map((recipe) => (
                    <li key={recipe.idMeal} onClick={() => openModal(recipe)}>
                        <RecipeCard
                            name={recipe.strMeal}
                            category={recipe.strCategory}
                            image={recipe.strMealThumb}
                            instructions={recipe.strInstructions}
                            isBookmarked={bookmarkedRecipes.some(
                                (r) => r.idMeal === recipe.idMeal
                            )}
                            onBookmark={() => toggleBookmark(recipe)}
                        />
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold mt-8 text-black">Bookmarked Recipes</h2>
            <ul className="flex flex-col gap-4 mt-4">
                {bookmarkedRecipes.map((recipe) => (
                    <li key={recipe.idMeal} onClick={() => openModal(recipe)}>
                        <RecipeCard
                            name={recipe.strMeal}
                            category={recipe.strCategory}
                            image={recipe.strMealThumb}
                            instructions={recipe.strInstructions}
                            isBookmarked
                            onBookmark={() => toggleBookmark(recipe)}
                        />
                    </li>
                ))}
            </ul>

            {modalIsOpen && (
                <RecipeModal
                    recipe={selectedRecipe}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default SearchResults;
