import React from 'react';
import { Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

export default function Filters({ onFilterChange, onSortChange, selectedFilters, currentSort, sortDirection }: Props) {
  const { t } = useTranslation();

  const sortOptions: FilterOption[] = [
    { id: 'match', label: t('filters.sort.match'), value: 'match' },
    { id: 'time', label: t('filters.sort.time'), value: 'time' },
    { id: 'calories', label: t('filters.sort.calories'), value: 'calories' },
    { id: 'rating', label: t('filters.sort.rating'), value: 'rating' },
    { id: 'price', label: t('filters.sort.price'), value: 'price' },
  ];

  const mealTypes: FilterOption[] = [
    { id: 'all', label: t('filters.meals.all'), value: 'all' },
    { id: 'breakfast', label: t('filters.meals.breakfast'), value: 'breakfast' },
    { id: 'lunch', label: t('filters.meals.lunch'), value: 'lunch' },
    { id: 'dinner', label: t('filters.meals.dinner'), value: 'dinner' },
  ];

  const dietaryRestrictions: FilterOption[] = [
    { id: 'none', label: t('filters.dietary.none'), value: 'none' },
    { id: 'vegetarian', label: t('filters.dietary.vegetarian'), value: 'vegetarian' },
    { id: 'vegan', label: t('filters.dietary.vegan'), value: 'vegan' },
    { id: 'gluten-free', label: t('filters.dietary.glutenFree'), value: 'gluten-free' },
  ];

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
        <h2 className="text-lg font-semibold">{t('filters.title')}</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.sortBy')}
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
            {t('filters.mealType')}
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
            {t('filters.dietaryRestrictions')}
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