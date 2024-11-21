export const basePrices: Record<string, number> = {
  vegetables: 0.0025, // 2.50€/kg
  fruits: 0.003,      // 3€/kg
  meats: 0.15,        // 15€/kg
  dairy: 0.001,       // 1€/kg
  grains: 0.001,      // 1€/kg
  other: 0.002        // 2€/kg
};

export function getEstimatedPrice(ingredient: { category: string }): number {
  return basePrices[ingredient.category] || 0.002;
}

export function calculateRecipePrice(recipe: { ingredients: Array<{ amount?: number; pricePerUnit?: number; category: string }> }): number {
  return recipe.ingredients.reduce((total, ingredient) => {
    const basePrice = ingredient.pricePerUnit || getEstimatedPrice(ingredient);
    return total + (basePrice * (ingredient.amount || 1));
  }, 0);
}