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
  selectedDate: string = '';
  meals: Meal[] = [];

  constructor(private googleFormMealsService: GoogleFormMealsService) { }

  onSelectSchool(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value.length) {
      this.selectedSchool = value;
      localStorage.setItem(this.storageKey, value);
    }

    if (this.selectedDate) {
      this.fetchMeals();
    }
  }

  onSelectDate(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.selectedDate = value;

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
      }
    }
  }

  fetchMeals() {
    // TODO: CORS issue, implement as observable:
    // this.googleFormMealsService.getMeals(this.selectedSchool, this.selectedDate).subscribe(response => {
    //   console.log(response);
    //   this.meals = response;
    // });
    this.meals = this.googleFormMealsService.getMeals(this.selectedSchool, this.selectedDate);
  }

  ngOnInit() {
    this.fetchSchools();
  }
}

// https://api-hm4fpyx6ka-uc.a.run.app/meals/east-liberty?date=2024-03-01