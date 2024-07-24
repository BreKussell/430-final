import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Meal } from './meal.model';
import { environment } from './environments/environment';
import { MOCKMEALS } from './mock-meals';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMeals(): Observable<Meal[]> {
    // Use mock data for development
    if (!environment.production) {
      return of(MOCKMEALS);
    }
    return this.http.get<Meal[]>(`${this.apiUrl}/meals`);
  }

  getMeal(id: string): Observable<Meal> {
    // Use mock data for development
    if (!environment.production) {
      const meal = MOCKMEALS.find(m => m._id === id);
      if (meal) {
        return of(meal);
      } else {
        // Handle the case where the meal is not found in the mock data
        throw new Error(`Meal with id ${id} not found`);
      }
    }
    return this.http.get<Meal>(`${this.apiUrl}/meals/${id}`);
  }

  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.apiUrl}/meals`, meal);
  }

  updateMeal(id: string, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/meals/${id}`, meal);
  }

  deleteMeal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meals/${id}`);
  }
}
