import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../meal.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string | null = null;
  recipe: any = null;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.mealService.getMealById(this.recipeId).subscribe(res => {
        this.recipe = res.meals ? res.meals[0] : null;
      });
    }
  }

  getIngredients(): string[] {
    if (!this.recipe) return [];

    return Array.from({ length: 30 }, (_, i) => {
      const ingredient = this.recipe[`strIngredient${i + 1}`];
      const measure = this.recipe[`strMeasure${i + 1}`];
      return ingredient ? `${ingredient} - ${measure}` : null;
    }).filter((item): item is string => !!item);
  }

  getInstructionSteps(): string[] {
    if (!this.recipe?.strInstructions) return [];

    return this.recipe.strInstructions
      .split(/\r?\n|\.\s+/)
      .map((step: string) => step.trim())
      .filter((step: string) => step.length > 0);
  }

  goBack() {
    this.location.back();
    setTimeout(() => window.scrollTo(0, 0), 100);
  }
}
