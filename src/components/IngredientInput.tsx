import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Ingredient } from '../types/recipe';
import { ingredientSuggestions } from '../data/ingredients';
import clsx from 'clsx';

interface Props {
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (id: string) => void;
  selectedIngredients: Ingredient[];
}

export default function IngredientInput({
  onAddIngredient,
  onRemoveIngredient,
  selectedIngredients,
}: Props) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<typeof ingredientSuggestions>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim()) {
      const filtered = ingredientSuggestions.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddIngredient = (name: string, category: string) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name,
      category: category as Ingredient['category'],
    };
    onAddIngredient(newIngredient);
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => input.trim() && setShowSuggestions(true)}
          placeholder={t('ingredients.placeholder')}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <button
          onClick={() => input.trim() && handleAddIngredient(input, 'other')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Plus className="w-5 h-5 text-blue-500" />
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleAddIngredient(suggestion.name, suggestion.category)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span>{suggestion.name}</span>
                <span className="text-sm text-gray-500">
                  {t(`ingredients.category.${suggestion.category}`)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedIngredients.map((ingredient) => (
          <span
            key={ingredient.id}
            className={clsx(
              'inline-flex items-center px-3 py-1 rounded-full text-sm',
              {
                'bg-green-100 text-green-800': ingredient.category === 'vegetables',
                'bg-red-100 text-red-800': ingredient.category === 'meats',
                'bg-yellow-100 text-yellow-800': ingredient.category === 'dairy',
                'bg-orange-100 text-orange-800': ingredient.category === 'grains',
                'bg-purple-100 text-purple-800': ingredient.category === 'fruits',
                'bg-blue-100 text-blue-800': ingredient.category === 'other',
              }
            )}
          >
            {ingredient.name}
            <button
              onClick={() => onRemoveIngredient(ingredient.id)}
              className="ml-2 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}