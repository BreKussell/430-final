import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MealFormComponent } from './meal-form.component';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('MealFormComponent', () => {
  let component: MealFormComponent;
  let fixture: ComponentFixture<MealFormComponent>;
  let mockMealService: jasmine.SpyObj<MealService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockMealService = jasmine.createSpyObj('MealService', ['getMeal', 'createMeal', 'updateMeal']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };

    await TestBed.configureTestingModule({
      declarations: [MealFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: MealService, useValue: mockMealService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createMeal on submit if not in edit mode', () => {
    component.isEditMode = false;
    component.meal = { name: 'Test Meal', ingredients: 'Test Ingredients', calories: 100, protein: 10, carbs: 10, fats: 5 };
    mockMealService.createMeal.and.returnValue(of(component.meal));
    component.onSubmit();
    expect(mockMealService.createMeal).toHaveBeenCalled();
  });

  it('should call updateMeal on submit if in edit mode', () => {
    component.isEditMode = true;
    component.meal = { _id: '1', name: 'Test Meal', ingredients: 'Test Ingredients', calories: 100, protein: 10, carbs: 10, fats: 5 };
    mockMealService.updateMeal.and.returnValue(of(component.meal));
    component.onSubmit();
    expect(mockMealService.updateMeal).toHaveBeenCalled();
  });

  it('should navigate back on cancel', () => {
    component.onCancel();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
