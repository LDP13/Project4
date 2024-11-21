import { useState, useMemo } from 'react';
import { Recipe, Ingredient } from '../types/recipe';
import { calculateRecipePrice } from '../utils/pricing';

export function useRecipes(initialRecipes: Recipe[]) {
  const [recipes, setRecipes] = useState(() => 
    initialRecipes.map(recipe => ({
      ...recipe,
      comments: [],
      averageRating: undefined,
      estimatedPrice: calculateRecipePrice(recipe)
    }))
  );

  const handleAddComment = (recipeId: string, content: string, rating: number, currentUserId: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: 'Utilisateur',
      content,
      rating,
      createdAt: new Date().toISOString(),
    };

    setRecipes(prevRecipes => {
      return prevRecipes.map(recipe => {
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
    });
  };

  const handleDeleteComment = (recipeId: string, commentId: string) => {
    setRecipes(prevRecipes => {
      return prevRecipes.map(recipe => {
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
    });
  };

  return {
    recipes,
    handleAddComment,
    handleDeleteComment
  };
}