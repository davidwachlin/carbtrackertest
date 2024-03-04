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
    // TODO: CORS issue, implement as observable:
    // this.googleFormMealsService.getSchools().subscribe(response => {
    //   console.log(response);
    //   this.meals = response;
    // });
    console.log('fetchSchools');
    const schools = this.googleFormMealsService.getSchools();
    console.log(schools);
    if (schools.length) {
      this.schools = schools;

      const savedSchoolKey = localStorage.getItem(this.storageKey);
      console.log(savedSchoolKey);
      const hasSavedSchool = schools.some(school => school.key === savedSchoolKey);
      console.log('hasSavedSchool ', hasSavedSchool);
      if (savedSchoolKey && hasSavedSchool) {
        this.selectedSchool = savedSchoolKey;
        this.fetchMeals();
      }
    }
  }

  fetchMeals() {
    // TODO: CORS issue, implement as observable:
    // this.googleFormMealsService.getMeals(this.selectedSchool, this.selectedDate).subscribe(response => {
    //   console.log(response);
    //   this.meals = response;
    // });
    const meals = this.googleFormMealsService.getMeals(this.selectedSchool, this.date);
    this.breakfastMeals = meals.filter(meal => meal.meal === 'breakfast');
    this.lunchMeals = meals.filter(meal => meal.meal === 'lunch');
    this.meals = this.googleFormMealsService.getMeals(this.selectedSchool, this.date);
  }

  ngOnInit() {
    this.fetchSchools();
  }
}

// https://api-hm4fpyx6ka-uc.a.run.app/meals/east-liberty?date=2024-03-01