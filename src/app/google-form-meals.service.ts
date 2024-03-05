import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal, MealResponse, School } from './types';

@Injectable({
  providedIn: 'root'
})
export class GoogleFormMealsService {
  baseUrl = 'https://api-hm4fpyx6ka-uc.a.run.app';

  constructor(
    private http: HttpClient
  ) { }

  getSchools() {
    const url = `${this.baseUrl}/schools`;
    console.log('GoogleFormMealsService.getSchools: ', url);
    // TODO: CORS issue
    return this.http.get<School[]>(url);
    // return schoolList as School[];
  }

  getMeals(school: string, date: string) {
    const url = `${this.baseUrl}/meals/${school}?date=${date}`;
    console.log('GoogleFormMealsService.getMeals: ', url);
    // const mealsResponse = mealsList as MealResponse[];
    // const meals: Meal[] = mealsResponse.map((meal, i) => ({...meal, id: `${meal.date}-i${i}`}))
    // return meals;
    // TODO: CORS issue
    return this.http.get<MealResponse[]>(url);
  }
}

// https://api-hm4fpyx6ka-uc.a.run.app/meals/east-liberty?date=2024-03-01