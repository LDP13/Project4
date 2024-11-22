export interface Ingredient {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'meats' | 'dairy' | 'grains' | 'other';
  amount?: number;
  unit?: string;
  pricePerUnit?: number;
}

export interface NutritionalValues {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  matchPercentage: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  nutritionalValues: NutritionalValues;
  comments: Comment[];
  averageRating?: number;
  estimatedPrice?: number;
}