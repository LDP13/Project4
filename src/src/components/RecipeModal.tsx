import React, { useState, useRef, useEffect } from 'react';
import { X, Clock, Users, ArrowRight, Plus, Minus } from 'lucide-react';
import { Recipe } from '../types/recipe';
import clsx from 'clsx';
import ProgressiveImage from './ProgressiveImage';

interface Props {
  recipe: Recipe;
  onClose: () => void;
  onViewDetails: () => void;
}

export default function RecipeModal({ recipe, onClose, onViewDetails }: Props) {
  const [servings, setServings] = useState(recipe.servings);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const adjustAmount = (amount?: number, unit?: string) => {
    if (!amount) return '';
    const adjusted = (amount * servings) / recipe.servings;
    return `${adjusted % 1 === 0 ? adjusted : adjusted.toFixed(1)} ${unit || ''}`;
  };

  const handleServingsChange = (delta: number) => {
    const newServings = Math.max(1, servings + delta);
    setServings(newServings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden relative animate-in fade-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-48 relative">
          <ProgressiveImage
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-4 h-4" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleServingsChange(-1)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm">{servings}</span>
                  <button
                    onClick={() => handleServingsChange(1)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 12rem)' }}>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Ingredients</h3>
              <div className="grid grid-cols-1 gap-2">
                {recipe.ingredients.map((ingredient) => (
                  <div 
                    key={ingredient.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          'w-2 h-2 rounded-full',
                          {
                            'bg-green-500': ingredient.category === 'vegetables',
                            'bg-red-500': ingredient.category === 'meats',
                            'bg-yellow-500': ingredient.category === 'dairy',
                            'bg-orange-500': ingredient.category === 'grains',
                            'bg-purple-500': ingredient.category === 'fruits',
                            'bg-blue-500': ingredient.category === 'other',
                          }
                        )}
                      />
                      <span>{ingredient.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {adjustAmount(ingredient.amount, ingredient.unit)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dietary Information</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.dietary.vegetarian && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Vegetarian
                  </span>
                )}
                {recipe.dietary.vegan && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Vegan
                  </span>
                )}
                {recipe.dietary.glutenFree && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Gluten Free
                  </span>
                )}
                <span className={clsx(
                  "px-3 py-1 rounded-full text-sm",
                  {
                    'bg-green-100 text-green-800': recipe.difficulty === 'easy',
                    'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium',
                    'bg-red-100 text-red-800': recipe.difficulty === 'hard',
                  }
                )}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            <button
              onClick={onViewDetails}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Full Recipe
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}