import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface Props {
  onFilterChange: (type: string, value: string) => void;
  selectedFilters: Record<string, string>;
}

const mealTypes: FilterOption[] = [
  { id: 'all', label: 'All Meals', value: 'all' },
  { id: 'breakfast', label: 'Breakfast', value: 'breakfast' },
  { id: 'lunch', label: 'Lunch', value: 'lunch' },
  { id: 'dinner', label: 'Dinner', value: 'dinner' },
];

const dietaryRestrictions: FilterOption[] = [
  { id: 'none', label: 'No Restrictions', value: 'none' },
  { id: 'vegetarian', label: 'Vegetarian', value: 'vegetarian' },
  { id: 'vegan', label: 'Vegan', value: 'vegan' },
  { id: 'gluten-free', label: 'Gluten Free', value: 'gluten-free' },
];

export default function Filters({ onFilterChange, selectedFilters }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Type
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
            Dietary Restrictions
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