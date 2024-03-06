import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealResponse, School } from './types';

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
    return this.http.get<School[]>(url);
  }

  getMeals(school: string, date: string) {
    const url = `${this.baseUrl}/meals/${school}?date=${date}`;
    return this.http.get<MealResponse[]>(url);
  }
}
