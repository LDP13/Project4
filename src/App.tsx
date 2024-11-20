import React, { useState, useMemo } from 'react';
import { ChefHat } from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import FullRecipe from './components/FullRecipe';
import Filters from './components/Filters';
import { Ingredient, Recipe } from './types/recipe';
import { recipes } from './data/recipes';

export default function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    mealType: 'all',
    dietary: 'none',
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [servings, setServings] = useState<number>(0);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (!ingredients.some((ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase())) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const toggleBookmark = (recipeId: string) => {
    setBookmarkedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters({ ...filters, [type]: value });
  };

  const handleViewFullRecipe = () => {
    if (selectedRecipe) {
      setServings(selectedRecipe.servings);
      setShowFullRecipe(true);
    }
  };

  const calculateMatchPercentage = (recipe: Recipe): number => {
    if (ingredients.length === 0) return 100;

    const userIngredients = ingredients.map(ing => ing.name.toLowerCase());
    const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());

    let matches = 0;
    userIngredients.forEach(ingredient => {
      if (recipeIngredients.some(recipeIng => recipeIng.includes(ingredient) || ingredient.includes(recipeIng))) {
        matches++;
      }
    });

    return Math.round((matches / userIngredients.length) * 100);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Filter by meal type
        if (filters.mealType !== 'all' && recipe.mealType !== filters.mealType) {
          return false;
        }

        // Filter by dietary restrictions
        if (filters.dietary === 'vegetarian' && !recipe.dietary.vegetarian) {
          return false;
        }
        if (filters.dietary === 'vegan' && !recipe.dietary.vegan) {
          return false;
        }
        if (filters.dietary === 'gluten-free' && !recipe.dietary.glutenFree) {
          return false;
        }

        // Calculate match percentage
        const matchPercentage = calculateMatchPercentage(recipe);
        recipe.matchPercentage = matchPercentage;

        // Only show recipes with at least one matching ingredient if ingredients are selected
        return ingredients.length === 0 || matchPercentage > 0;
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [ingredients, filters]);

  if (showFullRecipe && selectedRecipe) {
    return (
      <FullRecipe
        recipe={selectedRecipe}
        onBack={() => setShowFullRecipe(false)}
        servings={servings}
        onServingsChange={setServings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Recipe Finder</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Ingredients</h2>
              <IngredientInput
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                selectedIngredients={ingredients}
              />
            </div>
            <Filters
              onFilterChange={handleFilterChange}
              selectedFilters={filters}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredAndSortedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onBookmark={() => toggleBookmark(recipe.id)}
                    isBookmarked={bookmarkedRecipes.includes(recipe.id)}
                    onViewRecipe={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No recipes match your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedRecipe && !showFullRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onViewDetails={handleViewFullRecipe}
        />
      )}
    </div>
  );
}