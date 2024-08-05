const MeterToFeetSqMultipler = 10.7639104; // 1 square meter = 10.7639104 square feet
export const multipleByFeetFactor = (val) => val * MeterToFeetSqMultipler;
export const divideByFeetFactor = (val) => val / MeterToFeetSqMultipler;

export const shouldPreventFromUpdateTotalValue = (values = {}, active) => {
  const totalValueIngredientsInputNames = [
    "price_per_square_foot",
    "price_per_square_meters",
    "total_square_feet",
    "total_square_meters",
    "total_value",
  ];

  const isActiveIngredientInput =
    totalValueIngredientsInputNames.indexOf(active) >= 0;
  const canUpdateTotalValue = values.total_value || isActiveIngredientInput;

  return !canUpdateTotalValue;
};
