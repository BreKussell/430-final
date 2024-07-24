export interface Meal {
  _id?: string;
  name: string;
  ingredients: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}
