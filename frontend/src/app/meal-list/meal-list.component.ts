import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../meal.service';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];

  constructor(
    private mealService: MealService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals(): void {
    this.mealService.getMeals().subscribe(meals => this.meals = meals);
  }

  createMeal(): void {
    this.router.navigate(['/meal-form']);
  }

  editMeal(id: string): void {
    this.router.navigate(['/meal-form', id]);
  }

  deleteMeal(id: string): void {
    this.mealService.deleteMeal(id).subscribe(() => this.getMeals());
  }
}
