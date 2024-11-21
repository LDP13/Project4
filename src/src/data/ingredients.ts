export const ingredientCategories = [
  'vegetables',
  'fruits',
  'meats',
  'dairy',
  'grains',
  'other',
] as const;

export const ingredientSuggestions = [
  { name: 'Tomato', category: 'vegetables' },
  { name: 'Potato', category: 'vegetables' },
  { name: 'Carrot', category: 'vegetables' },
  { name: 'Chicken', category: 'meats' },
  { name: 'Beef', category: 'meats' },
  { name: 'Milk', category: 'dairy' },
  { name: 'Cheese', category: 'dairy' },
  { name: 'Rice', category: 'grains' },
  { name: 'Pasta', category: 'grains' },
  { name: 'Apple', category: 'fruits' },
  { name: 'Banana', category: 'fruits' },
  { name: 'Salt', category: 'other' },
  { name: 'Pepper', category: 'other' },
] as const;