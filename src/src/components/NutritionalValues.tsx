import React from 'react';
import { NutritionalValues } from '../types/recipe';

interface Props {
  values: NutritionalValues;
  servings?: number;
  originalServings?: number;
}

export default function NutritionalValuesComponent({ values, servings, originalServings }: Props) {
  const adjustValue = (value: number): number => {
    if (!servings || !originalServings) return value;
    return Math.round((value * servings) / originalServings);
  };

  const nutrients = [
    { label: 'Calories', value: adjustValue(values.calories), unit: 'kcal' },
    { label: 'Protein', value: adjustValue(values.protein), unit: 'g' },
    { label: 'Carbs', value: adjustValue(values.carbs), unit: 'g' },
    { label: 'Fat', value: adjustValue(values.fat), unit: 'g' },
    { label: 'Fiber', value: adjustValue(values.fiber), unit: 'g' },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Nutritional Values</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {nutrients.map(({ label, value, unit }) => (
          <div key={label} className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-gray-900">
              {value}
              <span className="text-sm text-gray-500 ml-1">{unit}</span>
            </div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">
        * Values per serving
      </div>
    </div>
  );
}