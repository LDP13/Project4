import React from 'react';
import { Clock, Users, ChevronLeft, Printer } from 'lucide-react';
import { Recipe } from '../types/recipe';
import ProgressiveImage from './ProgressiveImage';
import NutritionalValues from './NutritionalValues';
import clsx from 'clsx';

interface Props {
  recipe: Recipe;
  onBack: () => void;
  servings: number;
  onServingsChange: (servings: number) => void;
}

export default function FullRecipe({ recipe, onBack, servings, onServingsChange }: Props) {
  const adjustAmount = (amount?: number, unit?: string) => {
    if (!amount) return '';
    const adjusted = (amount * servings) / recipe.servings;
    return `${adjusted % 1 === 0 ? adjusted : adjusted.toFixed(1)} ${unit || ''}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to recipes</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Printer className="w-5 h-5" />
              <span className="hidden sm:inline">Print recipe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="mb-8">
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
            <ProgressiveImage
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Cook: {recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onServingsChange(Math.max(1, servings - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  -
                </button>
                <span>{servings} servings</span>
                <button
                  onClick={() => onServingsChange(servings + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium",
              {
                'bg-green-100 text-green-800': recipe.difficulty === 'easy',
                'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium',
                'bg-red-100 text-red-800': recipe.difficulty === 'hard',
              }
            )}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
            {recipe.dietary.vegan ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Vegan
              </span>
            ) : (
              recipe.dietary.vegetarian && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Vegetarian
                </span>
              )
            )}
            {recipe.dietary.glutenFree && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Gluten Free
              </span>
            )}
          </div>
          
          <NutritionalValues 
            values={recipe.nutritionalValues}
            servings={servings}
            originalServings={recipe.servings}
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span>{ingredient.name}</span>
                  <span className="text-gray-600">
                    {adjustAmount(ingredient.amount, ingredient.unit)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 flex-grow pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}