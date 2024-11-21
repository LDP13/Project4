import React from 'react';
import { Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface Props {
  onFilterChange: (type: string, value: string) => void;
  onSortChange: (value: string) => void;
  selectedFilters: Record<string, string>;
  currentSort: string;
  sortDirection: 'asc' | 'desc';
}

const mealTypes: FilterOption[] = [
  { id: 'all', label: 'Tous les repas', value: 'all' },
  { id: 'breakfast', label: 'Petit-déjeuner', value: 'breakfast' },
  { id: 'lunch', label: 'Déjeuner', value: 'lunch' },
  { id: 'dinner', label: 'Dîner', value: 'dinner' },
];

const dietaryRestrictions: FilterOption[] = [
  { id: 'none', label: 'Aucune restriction', value: 'none' },
  { id: 'vegetarian', label: 'Végétarien', value: 'vegetarian' },
  { id: 'vegan', label: 'Vegan', value: 'vegan' },
  { id: 'gluten-free', label: 'Sans gluten', value: 'gluten-free' },
];

const sortOptions: FilterOption[] = [
  { id: 'match', label: 'Meilleure correspondance', value: 'match' },
  { id: 'time', label: 'Temps de préparation', value: 'time' },
  { id: 'calories', label: 'Calories', value: 'calories' },
  { id: 'rating', label: 'Note', value: 'rating' },
];

export default function Filters({ onFilterChange, onSortChange, selectedFilters, currentSort, sortDirection }: Props) {
  const getSortIcon = (optionValue: string) => {
    if (currentSort !== optionValue) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Filtres</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.value)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  currentSort === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
                {getSortIcon(option.value)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de repas
          </label>
          <div className="flex flex-wrap gap-2">
            {mealTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onFilterChange('mealType', type.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedFilters.mealType === type.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restrictions alimentaires
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryRestrictions.map((restriction) => (
              <button
                key={restriction.id}
                onClick={() => onFilterChange('dietary', restriction.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedFilters.dietary === restriction.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {restriction.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}