import { Component } from '@angular/core';
import { Meal, MealType, School } from './types';
import { GoogleFormMealsService } from './google-form-meals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: string = '';
  private storageKey = 'saved-school';
  schools: School[] = [];
  selectedSchool: string = '';

  meals: Meal[] = [];
  breakfastMeals: Meal[] = [];
  breakfastTotal: number = 0;
  lunchMeals: Meal[] = [];
  lunchTotal: number = 0;
  carbsConsumedTotal: number = 0;

  isShowingBreakfast: boolean = true;

  constructor(private googleFormMealsService: GoogleFormMealsService) {
    this.date = new Date().toJSON().slice(0, 10);
  }

  onSelectSchool(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value?.length) {
      this.selectedSchool = value;
      localStorage.setItem(this.storageKey, value);
      this.resetState();
    }

    this.fetchMeals();
  }

  resetState() {
    this.breakfastMeals = [];
    this.lunchMeals = [];
    this.lunchTotal = 0;
    this.breakfastTotal = 0;
    this.carbsConsumedTotal = 0;
  }


  fetchSchools() {
    this.googleFormMealsService.getSchools().subscribe(schoolsResponse => {
      if (schoolsResponse?.length) {
        this.schools = [...schoolsResponse];

        const savedSchoolKey = localStorage.getItem(this.storageKey);
        const hasSavedSchool = schoolsResponse.some(school => school.key === savedSchoolKey);
        if (savedSchoolKey && hasSavedSchool) {
          this.selectedSchool = savedSchoolKey;
          this.fetchMeals();
        }
      }
    });
  }

  fetchMeals() {
    this.googleFormMealsService.getMeals(this.selectedSchool, this.date).subscribe(mealsResponse => {
      if (mealsResponse?.length) {
        const meals: Meal[] = mealsResponse.map((meal, i) => ({
          ...meal,
          id: `${meal.date}-i${i}`,
          carbsConsumed: 0,
          portionSize: 'none'
        }))
        this.meals = meals;
        this.breakfastMeals = meals.filter(meal => meal.meal === 'breakfast');
        this.lunchMeals = meals.filter(meal => meal.meal === 'lunch');
      }
    });
  }

  updateCarbCount(updatedCount: Meal) {
    if (updatedCount.meal === 'breakfast') {
      this.breakfastMeals = this.breakfastMeals.map(meal => meal.id === updatedCount.id ? updatedCount : meal);
    }

    if (updatedCount.meal === 'lunch') {
      this.lunchMeals = this.lunchMeals.map(meal => meal.id === updatedCount.id ? updatedCount : meal);
    }

    this.updateTotal();
  }

  updateTotal() {
    const breakfastTotal = this.breakfastMeals.reduce((acc, meal) => acc + meal.carbsConsumed, 0);
    const lunchTotal = this.lunchMeals.reduce((acc, meal) => acc + meal.carbsConsumed, 0);
    this.carbsConsumedTotal = breakfastTotal + lunchTotal;
  }

  ngOnInit() {
    this.fetchSchools();
  }

  toggleMealList() {
    this.isShowingBreakfast = !this.isShowingBreakfast;
  }

  getAccordionButtonClass(mealType: MealType) {
    if (mealType === 'breakfast') {
      return this.isShowingBreakfast ? 'accordion-button' : 'accordion-button collapsed';
    }
    return this.isShowingBreakfast ? 'accordion' : 'accordion is-hidden';
  }

  trackByFn(index: number, item: Meal) {
    return item.id;
  }
}
