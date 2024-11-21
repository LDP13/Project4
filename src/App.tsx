import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import FullRecipe from './components/FullRecipe';
import Filters from './components/Filters';
import { Recipe } from './types/recipe';
import { recipes as initialRecipes } from './data/recipes';
import { useRecipes } from './hooks/useRecipes';
import { useFiltering } from './hooks/useFiltering';
import Header from './components/Header';

export default function App() {
  const { recipes, handleAddComment, handleDeleteComment } = useRecipes(initialRecipes);
  const { 
    filters, 
    currentSort, 
    sortDirection, 
    handleFilterChange, 
    handleSortChange,
    filterAndSortRecipes 
  } = useFiltering();

  const [ingredients, setIngredients] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [servings, setServings] = useState(0);
  const [currentUserId] = useState('user-1');

  const filteredAndSortedRecipes = filterAndSortRecipes(recipes, ingredients);

  if (showFullRecipe && selectedRecipe) {
    return (
      <FullRecipe
        recipe={selectedRecipe}
        onBack={() => setShowFullRecipe(false)}
        servings={servings}
        onServingsChange={setServings}
        onAddComment={(recipeId, content, rating) => 
          handleAddComment(recipeId, content, rating, currentUserId)
        }
        onDeleteComment={handleDeleteComment}
        currentUserId={currentUserId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Vos Ingrédients</h2>
              <IngredientInput
                onAddIngredient={ingredient => setIngredients(prev => [...prev, ingredient])}
                onRemoveIngredient={id => setIngredients(prev => prev.filter(ing => ing.id !== id))}
                selectedIngredients={ingredients}
              />
            </div>
            <Filters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              selectedFilters={filters}
              currentSort={currentSort}
              sortDirection={sortDirection}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredAndSortedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onBookmark={() => {
                      setBookmarkedRecipes(prev =>
                        prev.includes(recipe.id)
                          ? prev.filter(id => id !== recipe.id)
                          : [...prev, recipe.id]
                      );
                    }}
                    isBookmarked={bookmarkedRecipes.includes(recipe.id)}
                    onViewRecipe={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune recette ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedRecipe && !showFullRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onViewDetails={() => {
            setServings(selectedRecipe.servings);
            setShowFullRecipe(true);
          }}
        />
      )}
    </div>
  );
}