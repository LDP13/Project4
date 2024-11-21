import { useState, useCallback, useMemo } from 'react';
import { Recipe } from '../types/recipe';

export function useFiltering() {
  const [filters, setFilters] = useState({
    mealType: 'all',
    dietary: 'none',
  });
  const [currentSort, setCurrentSort] = useState('match');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const filterAndSortRecipes = useCallback((recipes: Recipe[], ingredients: any[]) => {
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
            comparison = (b.averageRating || 0) - (a.averageRating || 0);
            break;
          case 'price':
            comparison = (a.estimatedPrice || 0) - (b.estimatedPrice || 0);
            break;
          case 'match':
          default:
            comparison = b.matchPercentage - a.matchPercentage;
            break;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [filters, currentSort, sortDirection]);

  return {
    filters,
    currentSort,
    sortDirection,
    handleFilterChange,
    handleSortChange,
    filterAndSortRecipes
  };
}