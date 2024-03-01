import { Component, Input } from '@angular/core';
import { CarbCount, Meal } from '../types';
import mealsList from '../../assets/meals-normalized.json';



@Component({
  selector: 'app-meal-card-list',
  templateUrl: './meal-card-list.component.html',
  styleUrls: ['./meal-card-list.component.css']
})
export class MealCardListComponent {
  @Input() meals: Meal[] = [];
  carbCounts: CarbCount[] = [];
  carbsConsumedTotal: number = 0;

  updateCarbCount(updatedCount: CarbCount) {

    if (updatedCount.portionSize === 'none') {
      const filteredCounts = this.carbCounts.filter(carbCount => carbCount.id !== updatedCount.id);
      console.log('MealCardListComponent.updateCarbCount: filteredCounts: ', filteredCounts);
      this.carbCounts = filteredCounts;
      this.updateTotal();
      return;
    }
    console.log('MealCardListComponent.updateCarbCount: ', updatedCount);
    if (this.carbCounts.some(carbCount => carbCount.id === updatedCount.id)) {
      this.carbCounts = this.carbCounts.map(carbCount => carbCount.id === updatedCount.id ? updatedCount : carbCount);
      this.updateTotal();
      return;
    }
    this.carbCounts.push(updatedCount);
    this.carbsConsumedTotal += updatedCount.carbsConsumed;
  }

  updateTotal() {
    this.carbsConsumedTotal = this.carbCounts
      .reduce((acc, carbCount) => acc + carbCount.carbsConsumed, 0);
  }
}
