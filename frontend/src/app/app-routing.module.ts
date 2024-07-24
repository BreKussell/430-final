import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MealFormComponent } from './meal-form/meal-form.component';

const routes: Routes = [
  { path: '', component: MealListComponent },
  { path: 'meal/:id', component: MealDetailComponent },
  { path: 'meal-form', component: MealFormComponent },
  { path: 'meal-form/:id', component: MealFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
