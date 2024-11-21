import React, { useState, useMemo, useCallback } from 'react';
import { ChefHat } from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import FullRecipe from './components/FullRecipe';
import Filters from './components/Filters';
import { Ingredient, Recipe, Comment } from './types/recipe';
import { recipes as initialRecipes } from './data/recipes';

export default function App() {
  const [recipes, setRecipes] = useState(() => 
    initialRecipes.map(recipe => ({
      ...recipe,
      comments: [],
      averageRating: undefined,
      estimatedPrice: calculateRecipePrice(recipe)
    }))
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    mealType: 'all',
    dietary: 'none',
  });
  const [currentSort, setCurrentSort] = useState('match');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [servings, setServings] = useState<number>(0);
  const [currentUserId] = useState('user-1');

  function calculateRecipePrice(recipe: Recipe): number {
    return recipe.ingredients.reduce((total, ingredient) => {
      const basePrice = ingredient.pricePerUnit || getEstimatedPrice(ingredient);
      return total + (basePrice * (ingredient.amount || 1));
    }, 0);
  }

  function getEstimatedPrice(ingredient: Ingredient): number {
    const basePrices: Record<string, number> = {
      vegetables: 0.0025,
      fruits: 0.003,
      meats: 0.15,
      dairy: 0.001,
      grains: 0.001,
      other: 0.002
    };
    return basePrices[ingredient.category] || 2;
  }

  const handleAddIngredient = useCallback((ingredient: Ingredient) => {
    if (!ingredients.some((ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase())) {
      setIngredients(prev => [...prev, ingredient]);
    }
  }, [ingredients]);

  const handleRemoveIngredient = useCallback((id: string) => {
    setIngredients(prev => prev.filter((ing) => ing.id !== id));
  }, []);

  const toggleBookmark = useCallback((recipeId: string) => {
    setBookmarkedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const handleFilterChange = useCallback((type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  }, []);

  const handleSortChange = useCallback((value: string) => {
    if (currentSort === value) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setCurrentSort(value);
      setSortDirection('desc');
    }
  }, [currentSort]);

  const handleViewFullRecipe = useCallback(() => {
    if (selectedRecipe) {
      setServings(selectedRecipe.servings);
      setShowFullRecipe(true);
    }
  }, [selectedRecipe]);

  const handleAddComment = useCallback((recipeId: string, content: string, rating: number) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: 'Utilisateur',
      content,
      rating,
      createdAt: new Date().toISOString(),
    };

    setRecipes(prevRecipes => {
      const updatedRecipes = prevRecipes.map(recipe => {
        if (recipe.id === recipeId) {
          const updatedComments = [...recipe.comments, newComment];
          const averageRating = updatedComments.reduce((acc, comment) => acc + comment.rating, 0) / updatedComments.length;
          return {
            ...recipe,
            comments: updatedComments,
            averageRating,
          };
        }
        return recipe;
      });

      if (selectedRecipe?.id === recipeId) {
        const updatedRecipe = updatedRecipes.find(r => r.id === recipeId);
        if (updatedRecipe) {
          setSelectedRecipe(updatedRecipe);
        }
      }

      return updatedRecipes;
    });
  }, [selectedRecipe, currentUserId]);

  const handleDeleteComment = useCallback((recipeId: string, commentId: string) => {
    setRecipes(prevRecipes => {
      const updatedRecipes = prevRecipes.map(recipe => {
        if (recipe.id === recipeId) {
          const updatedComments = recipe.comments.filter(comment => comment.id !== commentId);
          const averageRating = updatedComments.length > 0
            ? updatedComments.reduce((acc, comment) => acc + comment.rating, 0) / updatedComments.length
            : undefined;
          return {
            ...recipe,
            comments: updatedComments,
            averageRating,
          };
        }
        return recipe;
      });

      if (selectedRecipe?.id === recipeId) {
        const updatedRecipe = updatedRecipes.find(r => r.id === recipeId);
        if (updatedRecipe) {
          setSelectedRecipe(updatedRecipe);
        }
      }

      return updatedRecipes;
    });
  }, [selectedRecipe]);

  const calculateMatchPercentage = useCallback((recipe: Recipe): number => {
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
  }, [ingredients]);

  const filteredAndSortedRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        if (filters.mealType !== 'all' && recipe.mealType !== filters.mealType) {
          return false;
        }

        if (filters.dietary === 'vegetarian' && !recipe.dietary.vegetarian) {
          return false;
        }
        if (filters.dietary === 'vegan' && !recipe.dietary.vegan) {
          return false;
        }
        if (filters.dietary === 'gluten-free' && !recipe.dietary.glutenFree) {
          return false;
        }

        const matchPercentage = calculateMatchPercentage(recipe);
        recipe.matchPercentage = matchPercentage;

        return ingredients.length === 0 || matchPercentage > 0;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (currentSort) {
          case 'time':
            comparison = (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
            break;
          case 'calories':
            comparison = a.nutritionalValues.calories - b.nutritionalValues.calories;
            break;
          case 'rating':
            const aRating = a.averageRating || 0;
            const bRating = b.averageRating || 0;
            comparison = bRating - aRating;
            break;
          case 'price':
            const aPrice = a.estimatedPrice || 0;
            const bPrice = b.estimatedPrice || 0;
            comparison = aPrice - bPrice;
            break;
          case 'match':
          default:
            comparison = b.matchPercentage - a.matchPercentage;
            break;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [ingredients, filters, recipes, calculateMatchPercentage, currentSort, sortDirection]);

  if (showFullRecipe && selectedRecipe) {
    return (
      <FullRecipe
        recipe={selectedRecipe}
        onBack={() => setShowFullRecipe(false)}
        servings={servings}
        onServingsChange={setServings}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        currentUserId={currentUserId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Recherche de Recettes</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Vos Ingrédients</h2>
              <IngredientInput
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
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
                    onBookmark={() => toggleBookmark(recipe.id)}
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
          onViewDetails={handleViewFullRecipe}
        />
      )}
    </div>
  );
}