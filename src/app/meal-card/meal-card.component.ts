import { Component, Input } from '@angular/core';
import { Meal, PortionSize } from '../types';
import { Output, EventEmitter } from '@angular/core';

export const portionValues: Record<PortionSize, number> = {
  half: 0.5,
  full: 1,
  none: 0
};

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css']
})
export class MealCardComponent {
  @Input() meal: Meal;
  @Output() newCarbCountEvent = new EventEmitter<Meal>();

  onChangePortionSize(portion: PortionSize) {
    if (this.meal.portionSize === portion) {
      portion = 'none';
    }
    const carbsConsumed = portionValues[portion] * parseInt(this.meal.carbs, 10);
    const mealWithCarbCount: Meal = {
      ...this.meal,
      carbsConsumed,
      portionSize: portion
    };
    this.newCarbCountEvent.emit(mealWithCarbCount);
  }

  getButtonClass(portion: PortionSize) {
    if (this.meal.portionSize === portion) {
      return 'btn btn-primary';
    }
    return 'btn btn-outline-primary';
  }

}
