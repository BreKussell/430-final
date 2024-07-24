import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MealService } from '../meal.service';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  meal?: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.mealService.getMeal(id).subscribe(meal => this.meal = meal);
    } else {
      console.error('Meal ID is null');
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
