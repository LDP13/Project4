import React from 'react';
import { Clock, Users, Bookmark, ChefHat, Flame, Star, EuroIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../types/recipe';
import clsx from 'clsx';
import ProgressiveImage from './ProgressiveImage';

interface Props {
  recipe: Recipe;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  onViewRecipe: () => void;
}

export default function RecipeCard({
  recipe,
  onBookmark,
  isBookmarked,
  onViewRecipe,
}: Props) {
  const { t } = useTranslation();
  const { title, imageUrl, prepTime, cookTime, servings, matchPercentage, difficulty, mealType, dietary, nutritionalValues, averageRating, comments, estimatedPrice } = recipe;

  const getDifficultyLabel = (diff: string) => t(`recipe.difficulty.${diff}`);
  const getMealTypeLabel = (type: string) => t(`filters.meals.${type}`);

  return (
    <div 
      onClick={onViewRecipe}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="relative h-48">
        <ProgressiveImage
          src={imageUrl}
          alt={title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.();
          }}
          className="absolute top-2 right-2"
        >
          <button
            className={clsx(
              "p-2 rounded-full transition-colors",
              isBookmarked ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            )}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <ChefHat className="w-4 h-4 text-blue-500" />
          <span className="text-blue-500">{matchPercentage}% {t('recipe.match')}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          {averageRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">({comments.length})</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{prepTime + cookTime} {t('recipe.time.min')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{servings} {t('recipe.servings')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{nutritionalValues.calories} kcal</span>
          </div>
          {estimatedPrice && (
            <div className="flex items-center gap-1">
              <EuroIcon className="w-4 h-4" />
              <span>{estimatedPrice.toFixed(2)}€</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={clsx(
            "text-sm font-medium px-2 py-1 rounded-full",
            {
              'bg-green-100 text-green-800': difficulty === 'easy',
              'bg-yellow-100 text-yellow-800': difficulty === 'medium',
              'bg-red-100 text-red-800': difficulty === 'hard',
            }
          )}>
            {getDifficultyLabel(difficulty)}
          </span>
          
          <span className={clsx(
            "text-sm font-medium px-2 py-1 rounded-full",
            {
              'bg-orange-100 text-orange-800': mealType === 'breakfast',
              'bg-blue-100 text-blue-800': mealType === 'lunch',
              'bg-purple-100 text-purple-800': mealType === 'dinner',
              'bg-gray-100 text-gray-800': mealType === 'snack',
            }
          )}>
            {getMealTypeLabel(mealType)}
          </span>

          {recipe.dietary.vegan ? (
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              {t('filters.dietary.vegan')}
            </span>
          ) : (
            dietary.vegetarian && (
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                {t('filters.dietary.vegetarian')}
              </span>
            )
          )}
          {dietary.glutenFree && (
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              {t('filters.dietary.glutenFree')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}