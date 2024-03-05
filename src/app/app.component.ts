import { Component } from '@angular/core';
import { CarbCount, Meal, MealType, School } from './types';
import { GoogleFormMealsService } from './google-form-meals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private storageKey = 'saved-school';
  schools: School[] = [];
  selectedSchool: string = '';
  date: string = '';
  meals: Meal[] = [];
  breakfastMeals: Meal[] = [];
  lunchMeals: Meal[] = [];
  carbCounts: CarbCount[] = [];
  carbsConsumedTotal: number = 0;
  isShowingBreakfast: boolean = true;

  constructor(private googleFormMealsService: GoogleFormMealsService) {
    this.date = new Date().toJSON().slice(0, 10);
  }

  onSelectSchool(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value.length) {
      this.selectedSchool = value;
      localStorage.setItem(this.storageKey, value);
    }

    this.fetchMeals();
  }


  fetchSchools() {
    console.log('fetchSchools');
    this.googleFormMealsService.getSchools().subscribe(schoolsResponse => {
      if (schoolsResponse?.length) {
        this.schools = [...schoolsResponse];

        const savedSchoolKey = localStorage.getItem(this.storageKey);
        console.log('savedSchoolKey', savedSchoolKey);
        const hasSavedSchool = schoolsResponse.some(school => school.key === savedSchoolKey);
        console.log('hasSavedSchool ', hasSavedSchool);
        if (savedSchoolKey && hasSavedSchool) {
          this.selectedSchool = savedSchoolKey;
          this.fetchMeals();
        }
      }
    });
  }

  fetchMeals() {
    this.googleFormMealsService.getMeals(this.selectedSchool, this.date).subscribe(mealsResponse => {
      console.log('fetchMeals mealsResponse: ', mealsResponse);
      if (mealsResponse?.length) {
        const meals: Meal[] = mealsResponse.map((meal, i) => ({ ...meal, id: `${meal.date}-i${i}` }))
        this.meals = [...meals];
        this.breakfastMeals = meals.filter(meal => meal.meal === 'breakfast');
        this.lunchMeals = meals.filter(meal => meal.meal === 'lunch');
      }
    });
  }

  updateCarbCount(updatedCount: CarbCount) {

    if (updatedCount.portionSize === 'none') {
      const filteredCounts = this.carbCounts.filter(carbCount => carbCount.id !== updatedCount.id);
      this.carbCounts = filteredCounts;
      this.updateTotal();
      return;
    }
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

  ngOnInit() {
    this.fetchSchools();
  }

  toggleMealList() {

    this.isShowingBreakfast = !this.isShowingBreakfast;
  }

  getAccordionButtonClass(mealType: MealType) {
    console.log('getAccordionButtonClass', mealType, this.isShowingBreakfast)
    if (mealType === 'breakfast') {
      return this.isShowingBreakfast ? 'accordion-button' : 'accordion-button collapsed';
    }
    return this.isShowingBreakfast ? 'accordion' : 'accordion is-hidden';
  }
}
