import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MealService } from './meal.service';
import { Recipe } from './app.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchQuery = '';
  currentPage = 1;
  totalRecipes = 0;
  pageSize = 8;
  maxPages = 4;

  recipes: Recipe[] = [];
  paginatedRecipes: Recipe[] = [];

  @ViewChild('recipesSection') recipesSection!: ElementRef;

  constructor(
    private mealService: MealService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllMeals();
  }

  private loadAllMeals() {
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

  private countIngredients(meal: any): number {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) count++;
    }
    return count;
  }

  private paginateRecipes(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRecipes = this.recipes.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateRecipes();
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
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

        this.cdr.detectChanges();

        setTimeout(() => {
          const matchedRecipe = this.paginatedRecipes.find(r => r.title.toLowerCase().includes(query));
          if (matchedRecipe) {
            const el = document.getElementById('recipe-' + matchedRecipe.id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            this.scrollToRecipes();
          }
        }, 100);
      } else {
        this.recipes = [];
        this.totalRecipes = 0;
        this.paginatedRecipes = [];
      }
    });
  }

  scrollToRecipes() {
    setTimeout(() => {
      if (this.recipesSection) {
        this.recipesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

}
