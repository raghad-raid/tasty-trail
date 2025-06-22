import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealService } from '../meal.service';
import { HeroComponent } from '../hero/hero.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { RecipeGridComponent } from '../recipe-grid/recipe-grid.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, HeroComponent, NavigationComponent, RecipeGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  currentPage = 1;
  pageSize = 8;
  totalRecipes = 0;
  maxPages = 2;

  recipes: any[] = [];
  paginatedRecipes: any[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.fetchAllMeals();
  }

  fetchAllMeals(): void {
    this.mealService.getAllMeals().subscribe(res => {
      if (res.meals) {
        this.recipes = res.meals.map((meal: any, index: number) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          cookingTime: 30 + index * 5,
          ingredients: this.countIngredients(meal),
          imageUrl: meal.strMealThumb
        }));
        this.totalRecipes = this.recipes.length;
        this.paginateRecipes();
      }
    });
  }

  countIngredients(meal: any): number {
    let count = 0;
    for (let i = 1; i <= 30; i++) {
      if (meal[`strIngredient${i}`]) count++;
    }
    return count;
  }

  paginateRecipes(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRecipes = this.recipes.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateRecipes();
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.mealService.searchMeals(query).subscribe(res => {
      if (res.meals) {
        this.recipes = res.meals.map((meal: any, index: number) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          cookingTime: 30 + index * 5,
          ingredients: this.countIngredients(meal),
          imageUrl: meal.strMealThumb
        }));
        this.totalRecipes = this.recipes.length;
        this.currentPage = 1;
        this.paginateRecipes();
      } else {
        this.recipes = [];
        this.totalRecipes = 0;
        this.paginatedRecipes = [];
      }
    });
  }
}
