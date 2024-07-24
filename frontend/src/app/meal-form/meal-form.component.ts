import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MealService } from '../meal.service';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {
  meal: Meal = {
    name: '',
    ingredients: '',
    calories: undefined,
    protein: undefined,
    carbs: undefined,
    fats: undefined
  };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.mealService.getMeal(id).subscribe(meal => this.meal = meal);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      if (this.meal._id) {
        this.mealService.updateMeal(this.meal._id, this.meal).subscribe(() => this.goBack());
      } else {
        console.error('Meal ID is not defined');
      }
    } else {
      this.mealService.createMeal(this.meal).subscribe(() => this.goBack());
    }
  }

  onCancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
