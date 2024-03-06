export type MealType = 'breakfast' | 'lunch';

export interface MealResponse {
  meal: MealType;
  date: string;
  carbs: string;
  school: string;
  description: string;
}

export interface Meal extends MealResponse {
  id: string;
  carbsConsumed: number;
  portionSize: PortionSize;
}

export interface School {
  display: string;
  key: string;
  meals: MealType[];
}

export type PortionSize = 'half' | 'full' | 'none';
