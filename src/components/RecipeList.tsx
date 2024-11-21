import React from 'react';
import { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

interface Props {
  recipes: Recipe[];
  bookmarkedRecipes: string[];
  onBookmark: (recipeId: string) => void;
  onViewRecipe: (recipe: Recipe) => void;
}

export default function RecipeList({
  recipes,
  bookmarkedRecipes,
  onBookmark,
  onViewRecipe,
}: Props) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune recette ne correspond à vos critères.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onBookmark={() => onBookmark(recipe.id)}
          isBookmarked={bookmarkedRecipes.includes(recipe.id)}
          onViewRecipe={() => onViewRecipe(recipe)}
        />
      ))}
    </div>
  );
}