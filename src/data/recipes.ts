import { Recipe } from '../types/recipe';
import photo1 from '../images/photo-1645112411341-6c4fd023714a-_1_.webp';
import photo2 from '../images/photo-1546793665-c74683f339c1-_1_.webp';
import photo3 from '../images/photo-1512621776951-a57141f2eefd.webp';
import photo4 from '../images/photo-1568901346375-23c9450c58cd.webp';
import photo5 from '../images/photo-1529059997568-3d847b1154f0.webp';
import photo6 from '../images/photo-1569718212165-3a8278d5f624.webp';
import photo7 from '../images/photo-1484723091739-30a097e8f929.webp';
import photo8 from '../images/photo-1546069901-ba9599a7e63c.webp';
import photo9 from '../images/photo-1512058564366-18510be2db19.webp';
import photo10 from '../images/photo-1490474418585-ba9bad8fd0ea.webp';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Mushroom Pasta',
    imageUrl: photo1,
    prepTime: 15,
    cookTime: 20,
    difficulty: 'medium',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '1', name: 'Mushrooms', category: 'vegetables', amount: 250, unit: 'g' },
      { id: '2', name: 'Pasta', category: 'grains', amount: 400, unit: 'g' },
      { id: '3', name: 'Cream', category: 'dairy', amount: 200, unit: 'ml' },
      { id: '4', name: 'Garlic', category: 'vegetables', amount: 2, unit: 'cloves' },
      { id: '5', name: 'Parmesan', category: 'dairy', amount: 50, unit: 'g' },
    ],
    instructions: [
      'Boil pasta according to package instructions',
      'Sauté mushrooms until golden brown',
      'Add cream and simmer until thickened',
      'Combine pasta with sauce and serve',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    matchPercentage: 85,
    nutritionalValues: {
      calories: 450,
      protein: 12,
      carbs: 65,
      fat: 18,
      fiber: 4
    },
    comments: []
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    imageUrl: photo2,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    servings: 2,
    mealType: 'lunch',
    ingredients: [
      { id: '6', name: 'Chicken Breast', category: 'meats', amount: 300, unit: 'g' },
      { id: '7', name: 'Lettuce', category: 'vegetables', amount: 1, unit: 'head' },
      { id: '8', name: 'Tomatoes', category: 'vegetables', amount: 2, unit: 'medium' },
      { id: '9', name: 'Olive Oil', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '10', name: 'Balsamic Vinegar', category: 'other', amount: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Season and grill the chicken',
      'Chop vegetables',
      'Combine ingredients',
      'Add dressing and serve',
    ],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    matchPercentage: 92,
    nutritionalValues: {
      calories: 320,
      protein: 38,
      carbs: 8,
      fat: 15,
      fiber: 3
    },
    comments: []
  },
  {
    id: '3',
    title: 'Vegetarian Buddha Bowl',
    imageUrl: photo3,
    prepTime: 20,
    cookTime: 25,
    difficulty: 'medium',
    servings: 2,
    mealType: 'lunch',
    ingredients: [
      { id: '11', name: 'Quinoa', category: 'grains', amount: 150, unit: 'g' },
      { id: '12', name: 'Sweet Potato', category: 'vegetables', amount: 1, unit: 'large' },
      { id: '13', name: 'Chickpeas', category: 'other', amount: 400, unit: 'g' },
      { id: '14', name: 'Kale', category: 'vegetables', amount: 100, unit: 'g' },
      { id: '15', name: 'Avocado', category: 'vegetables', amount: 1, unit: 'medium' },
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Roast sweet potato and chickpeas',
      'Massage kale with olive oil',
      'Assemble bowl with all ingredients',
    ],
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    matchPercentage: 78,
    nutritionalValues: {
      calories: 580,
      protein: 20,
      carbs: 85,
      fat: 22,
      fiber: 15
    },
    comments: []
  },
  {
    id: '4',
    title: 'Classic Beef Burger',
    imageUrl: photo4,
    prepTime: 15,
    cookTime: 10,
    difficulty: 'easy',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '16', name: 'Ground Beef', category: 'meats', amount: 600, unit: 'g' },
      { id: '17', name: 'Burger Buns', category: 'grains', amount: 4, unit: 'pieces' },
      { id: '18', name: 'Cheese', category: 'dairy', amount: 4, unit: 'slices' },
      { id: '19', name: 'Lettuce', category: 'vegetables', amount: 4, unit: 'leaves' },
      { id: '20', name: 'Tomato', category: 'vegetables', amount: 1, unit: 'large' },
    ],
    instructions: [
      'Form beef into patties',
      'Grill until desired doneness',
      'Add cheese at the end',
      'Assemble burgers with toppings',
    ],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    matchPercentage: 95,
    nutritionalValues: {
      calories: 650,
      protein: 45,
      carbs: 35,
      fat: 38,
      fiber: 2
    },
    comments: []
  },
  {
    id: '5',
    title: 'Mediterranean Quinoa Bowl',
    imageUrl: photo5,
    prepTime: 15,
    cookTime: 20,
    difficulty: 'easy',
    servings: 3,
    mealType: 'lunch',
    ingredients: [
      { id: '21', name: 'Quinoa', category: 'grains', amount: 200, unit: 'g' },
      { id: '22', name: 'Cherry Tomatoes', category: 'vegetables', amount: 200, unit: 'g' },
      { id: '23', name: 'Cucumber', category: 'vegetables', amount: 1, unit: 'medium' },
      { id: '24', name: 'Feta Cheese', category: 'dairy', amount: 100, unit: 'g' },
      { id: '25', name: 'Kalamata Olives', category: 'vegetables', amount: 50, unit: 'g' },
    ],
    instructions: [
      'Cook quinoa and let it cool',
      'Chop vegetables',
      'Mix all ingredients',
      'Drizzle with olive oil and serve',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
    },
    matchPercentage: 88,
    nutritionalValues: {
      calories: 380,
      protein: 15,
      carbs: 48,
      fat: 16,
      fiber: 7
    },
    comments: []
  },
  {
    id: '6',
    title: 'Spicy Thai Noodle Soup',
    imageUrl: photo6,
    prepTime: 20,
    cookTime: 25,
    difficulty: 'medium',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '26', name: 'Rice Noodles', category: 'grains', amount: 300, unit: 'g' },
      { id: '27', name: 'Coconut Milk', category: 'other', amount: 400, unit: 'ml' },
      { id: '28', name: 'Red Curry Paste', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '29', name: 'Tofu', category: 'other', amount: 200, unit: 'g' },
      { id: '30', name: 'Bean Sprouts', category: 'vegetables', amount: 100, unit: 'g' },
    ],
    instructions: [
      'Cook noodles according to package',
      'Simmer coconut milk with curry paste',
      'Add tofu and vegetables',
      'Combine with noodles and serve',
    ],
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    matchPercentage: 82,
    nutritionalValues: {
      calories: 420,
      protein: 14,
      carbs: 58,
      fat: 16,
      fiber: 4
    },
    comments: []
  },
  {
    id: '7',
    title: 'Classic French Toast',
    imageUrl: photo7,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    servings: 4,
    mealType: 'breakfast',
    ingredients: [
      { id: '31', name: 'Bread', category: 'grains', amount: 8, unit: 'slices' },
      { id: '32', name: 'Eggs', category: 'other', amount: 4, unit: 'large' },
      { id: '33', name: 'Milk', category: 'dairy', amount: 240, unit: 'ml' },
      { id: '34', name: 'Vanilla Extract', category: 'other', amount: 1, unit: 'tsp' },
      { id: '35', name: 'Cinnamon', category: 'other', amount: 1, unit: 'tsp' },
    ],
    instructions: [
      'Whisk eggs, milk, vanilla, and cinnamon',
      'Dip bread slices in mixture',
      'Cook on griddle until golden',
      'Serve with maple syrup',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    matchPercentage: 90,
    nutritionalValues: {
      calories: 280,
      protein: 12,
      carbs: 38,
      fat: 10,
      fiber: 2
    },
    comments: []
  },
  {
    id: '8',
    title: 'Salmon Poke Bowl',
    imageUrl: photo8,
    prepTime: 20,
    cookTime: 0,
    difficulty: 'medium',
    servings: 2,
    mealType: 'lunch',
    ingredients: [
      { id: '36', name: 'Sushi Rice', category: 'grains', amount: 200, unit: 'g' },
      { id: '37', name: 'Fresh Salmon', category: 'meats', amount: 200, unit: 'g' },
      { id: '38', name: 'Avocado', category: 'vegetables', amount: 1, unit: 'medium' },
      { id: '39', name: 'Soy Sauce', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '40', name: 'Seaweed', category: 'other', amount: 2, unit: 'sheets' },
    ],
    instructions: [
      'Cook sushi rice and let it cool',
      'Cut salmon into cubes',
      'Prepare toppings',
      'Assemble bowl with all ingredients',
    ],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    matchPercentage: 87,
    nutritionalValues: {
      calories: 520,
      protein: 32,
      carbs: 65,
      fat: 18,
      fiber: 6
    },
    comments: []
  },
  {
    id: '9',
    title: 'Vegetable Stir Fry',
    imageUrl: photo9,
    prepTime: 15,
    cookTime: 10,
    difficulty: 'easy',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '41', name: 'Mixed Vegetables', category: 'vegetables', amount: 500, unit: 'g' },
      { id: '42', name: 'Tofu', category: 'other', amount: 200, unit: 'g' },
      { id: '43', name: 'Soy Sauce', category: 'other', amount: 3, unit: 'tbsp' },
      { id: '44', name: 'Ginger', category: 'vegetables', amount: 1, unit: 'thumb' },
      { id: '45', name: 'Garlic', category: 'vegetables', amount: 3, unit: 'cloves' },
    ],
    instructions: [
      'Press and cube tofu',
      'Chop all vegetables',
      'Stir fry in wok',
      'Add sauce and serve',
    ],
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    matchPercentage: 94,
    nutritionalValues: {
      calories: 220,
      protein: 15,
      carbs: 25,
      fat: 8,
      fiber: 6
    },
    comments: []
  },
  {
    id: '10',
    title: 'Chocolate Banana Smoothie Bowl',
    imageUrl: photo10,
    prepTime: 10,
    cookTime: 0,
    difficulty: 'easy',
    servings: 1,
    mealType: 'breakfast',
    ingredients: [
      { id: '46', name: 'Frozen Bananas', category: 'fruits', amount: 2, unit: 'medium' },
      { id: '47', name: 'Cocoa Powder', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '48', name: 'Almond Milk', category: 'other', amount: 120, unit: 'ml' },
      { id: '49', name: 'Honey', category: 'other', amount: 1, unit: 'tbsp' },
      { id: '50', name: 'Granola', category: 'grains', amount: 30, unit: 'g' },
    ],
    instructions: [
      'Blend frozen bananas with cocoa and milk',
      'Add honey to taste',
      'Pour into bowl',
      'Top with granola and fresh fruit',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
    },
    matchPercentage: 96,
    nutritionalValues: {
      calories: 380,
      protein: 8,
      carbs: 82,
      fat: 6,
      fiber: 9
    },
    comments: []
  },
  {
    id: '11',
    title: 'Lemon Herb Chicken',
    imageUrl: 'photo11',
    prepTime: 10,
    cookTime: 25,
    difficulty: 'easy',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '51', name: 'Chicken Thighs', category: 'meats', amount: 600, unit: 'g' },
      { id: '52', name: 'Lemon Juice', category: 'other', amount: 3, unit: 'tbsp' },
      { id: '53', name: 'Garlic', category: 'vegetables', amount: 2, unit: 'cloves' },
      { id: '54', name: 'Olive Oil', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '55', name: 'Parsley', category: 'herbs', amount: 10, unit: 'g' },
    ],
    instructions: [
      'Marinate chicken with lemon juice, garlic, and herbs.',
      'Heat oil and sear chicken until golden.',
      'Bake in oven until cooked through.',
      'Serve garnished with parsley.',
    ],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    nutritionalValues: {
      calories: 320,
      protein: 28,
      carbs: 2,
      fat: 22,
      fiber: 0
    },
    comments: []
  },
  {
    id: '12',
    title: 'Sweet Potato Curry',
    imageUrl: 'photo12',
    prepTime: 15,
    cookTime: 30,
    difficulty: 'medium',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '56', name: 'Sweet Potatoes', category: 'vegetables', amount: 500, unit: 'g' },
      { id: '57', name: 'Coconut Milk', category: 'other', amount: 400, unit: 'ml' },
      { id: '58', name: 'Onions', category: 'vegetables', amount: 1, unit: 'medium' },
      { id: '59', name: 'Curry Powder', category: 'other', amount: 2, unit: 'tsp' },
      { id: '60', name: 'Spinach', category: 'vegetables', amount: 100, unit: 'g' },
    ],
    instructions: [
      'Sauté onions until soft.',
      'Add sweet potatoes and curry powder.',
      'Pour coconut milk and simmer.',
      'Stir in spinach and cook until wilted.',
    ],
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    nutritionalValues: {
      calories: 350,
      protein: 5,
      carbs: 50,
      fat: 14,
      fiber: 8
    },
    matchPercentage: 85,
    comments: []
  },
  {
    id: '13',
    title: 'Beef Stir-Fry',
    imageUrl: 'photo13',
    prepTime: 15,
    cookTime: 10,
    difficulty: 'medium',
    servings: 4,
    mealType: 'dinner',
    ingredients: [
      { id: '61', name: 'Beef Strips', category: 'meats', amount: 400, unit: 'g' },
      { id: '62', name: 'Mixed Vegetables', category: 'vegetables', amount: 300, unit: 'g' },
      { id: '63', name: 'Soy Sauce', category: 'other', amount: 2, unit: 'tbsp' },
      { id: '64', name: 'Ginger', category: 'vegetables', amount: 1, unit: 'thumb' },
      { id: '65', name: 'Garlic', category: 'vegetables', amount: 2, unit: 'cloves' },
    ],
    instructions: [
      'Marinate beef with soy sauce, garlic, and ginger.',
      'Stir-fry beef until browned.',
      'Add vegetables and cook until tender.',
      'Serve hot over rice.',
    ],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    },
    nutritionalValues: {
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 12,
      fiber: 4
    },
    matchPercentage: 85,
    comments: []
  },
  {
    id: '14',
    title: 'Greek Yogurt Parfait',
    imageUrl: 'photo14',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    servings: 1,
    mealType: 'breakfast',
    ingredients: [
      { id: '66', name: 'Greek Yogurt', category: 'dairy', amount: 150, unit: 'g' },
      { id: '67', name: 'Granola', category: 'grains', amount: 30, unit: 'g' },
      { id: '68', name: 'Berries', category: 'fruits', amount: 50, unit: 'g' },
      { id: '69', name: 'Honey', category: 'other', amount: 1, unit: 'tsp' },
    ],
    instructions: [
      'Layer yogurt, granola, and berries in a glass.',
      'Drizzle with honey on top.',
      'Serve chilled.',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    nutritionalValues: {
      calories: 220,
      protein: 10,
      carbs: 28,
      fat: 8,
      fiber: 3
    },
    matchPercentage: 89,
    comments: []
  },
  {
    id: '15',
    title: 'Margherita Pizza',
    imageUrl: 'photo15',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'medium',
    servings: 2,
    mealType: 'dinner',
    ingredients: [
      { id: '70', name: 'Pizza Dough', category: 'grains', amount: 1, unit: 'piece' },
      { id: '71', name: 'Tomato Sauce', category: 'vegetables', amount: 100, unit: 'ml' },
      { id: '72', name: 'Mozzarella', category: 'dairy', amount: 125, unit: 'g' },
      { id: '73', name: 'Basil', category: 'herbs', amount: 10, unit: 'g' },
      { id: '74', name: 'Olive Oil', category: 'other', amount: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Roll out pizza dough.',
      'Spread tomato sauce and top with mozzarella.',
      'Bake in a preheated oven at 220°C for 15 minutes.',
      'Garnish with basil and olive oil before serving.',
    ],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    nutritionalValues: {
      calories: 450,
      protein: 18,
      carbs: 50,
      fat: 18,
      fiber: 3
    },
    matchPercentage: 92,
    comments: []
  },
];