import { Component } from '@angular/core';
import { Meal, School } from './types';
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

  constructor(private googleFormMealsService: GoogleFormMealsService) {
    this.date = new Date().toJSON().slice(0, 10);
    // this.date = '2024-03-01';
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

  ngOnInit() {
    this.fetchSchools();
  }
}
