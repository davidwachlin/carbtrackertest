import { Component, Input } from '@angular/core';
import { CarbCount, Meal } from '../types';

@Component({
  selector: 'app-meal-table',
  templateUrl: './meal-table.component.html',
  styleUrls: ['./meal-table.component.css']
})
export class MealTableComponent {
  constructor() { }
  @Input() carbCounts: CarbCount[] = [];


}
