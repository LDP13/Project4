import React from 'react';
import { Ingredient } from '../types/recipe';
import IngredientInput from './IngredientInput';
import Filters from './Filters';

interface Props {
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (id: string) => void;
  selectedIngredients: Ingredient[];
  onFilterChange: (type: string, value: string) => void;
  onSortChange: (value: string) => void;
  selectedFilters: Record<string, string>;
  currentSort: string;
  sortDirection: 'asc' | 'desc';
}

export default function Sidebar({
  onAddIngredient,
  onRemoveIngredient,
  selectedIngredients,
  onFilterChange,
  onSortChange,
  selectedFilters,
  currentSort,
  sortDirection,
}: Props) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Vos Ingrédients</h2>
        <IngredientInput
          onAddIngredient={onAddIngredient}
          onRemoveIngredient={onRemoveIngredient}
          selectedIngredients={selectedIngredients}
        />
      </div>
      <Filters
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        selectedFilters={selectedFilters}
        currentSort={currentSort}
        sortDirection={sortDirection}
      />
    </div>
  );
}