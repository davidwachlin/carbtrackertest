import { Component, Input } from '@angular/core';
import { CarbCount, Meal, PortionSize } from '../types';
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
  @Output() newCarbCountEvent = new EventEmitter<CarbCount>();
  portionSize: PortionSize | null = null;

  onChangePortionSize(portion: PortionSize) {
    console.log('MealCardComponent.onChangePortionSize: ', portion);
    if (this.portionSize === portion) {
      this.portionSize = null;
      this.addNewCarbCount('none');
      return;
    }
    this.portionSize = portion;
    this.addNewCarbCount(portion);
  }

  addNewCarbCount(portion: PortionSize) {
    // this.portionSize = portion;
    const carbsConsumed = portionValues[portion] * parseInt(this.meal.carbs, 10);
    const mealWithCarbCount: CarbCount = {
      ...this.meal,
      carbsConsumed,
      portionSize: portion
    };
    this.newCarbCountEvent.emit(mealWithCarbCount);
  }

  getButtonClass(portion: PortionSize) {
    if (this.portionSize === portion) {
      return 'btn btn-primary';
    }
    return 'btn btn-outline-primary';
    // return this.meal.carbs === '0' ? 'btn-danger' : 'btn-success';
  }

}
