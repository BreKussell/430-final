import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MealDetailComponent } from './meal-detail.component';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Meal } from '../meal.model';

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;
  let mockMealService;
  let mockMeal: Meal = {
    _id: '1',
    name: 'Sample Meal',
    ingredients: 'Sample Ingredients',
    calories: 500,
    protein: 30,
    carbs: 50,
    fats: 20,
  };

  beforeEach(async () => {
    mockMealService = jasmine.createSpyObj(['getMeal']);
    mockMealService.getMeal.and.returnValue(of(mockMeal));

    await TestBed.configureTestingModule({
      declarations: [MealDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: MealService, useValue: mockMealService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display meal details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Sample Meal');
    expect(compiled.querySelector('p').textContent).toContain('Sample Ingredients');
  });
});
