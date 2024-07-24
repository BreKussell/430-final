import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MealListComponent } from './meal-list.component';
import { MealService } from '../meal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('MealListComponent', () => {
  let component: MealListComponent;
  let fixture: ComponentFixture<MealListComponent>;
  let mockMealService;

  const mockMeals = [
    { _id: '1', name: 'Meal 1', ingredients: 'Ingredients 1', calories: 500, protein: 30, carbs: 50, fats: 20 },
    { _id: '2', name: 'Meal 2', ingredients: 'Ingredients 2', calories: 600, protein: 40, carbs: 60, fats: 30 }
  ];

  beforeEach(async () => {
    mockMealService = jasmine.createSpyObj(['getMeals', 'deleteMeal']);
    mockMealService.getMeals.and.returnValue(of(mockMeals));

    await TestBed.configureTestingModule({
      declarations: [MealListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: MealService, useValue: mockMealService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of meals', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBe(2);
    expect(compiled.querySelector('h3').textContent).toContain('Meal 1');
  });

  it('should call deleteMeal when delete button is clicked', () => {
    spyOn(component, 'deleteMeal');
    fixture.debugElement.query(By.css('button:nth-of-type(2)')).triggerEventHandler('click', null);
    expect(component.deleteMeal).toHaveBeenCalledWith('1');
  });
});
