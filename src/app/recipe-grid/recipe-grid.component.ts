import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../app.model'; 

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-grid.component.html',
  styleUrls: ['./recipe-grid.component.css']
})
export class RecipeGridComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  favorites: { id: string | number; title: string }[] = []; 

  ngOnInit(): void {
  const stored = localStorage.getItem('favorites');
  this.favorites = stored ? JSON.parse(stored) : [];
}

isFavorited(id: number): boolean {
  return this.favorites.some(f => f.id === id);
}

toggleFavorite(recipe: any, event: Event): void {
  event.preventDefault();         // To prevent navigation to the details page
  event.stopPropagation();       // Prevent router link activation

  const index = this.favorites.findIndex(f => f.id === recipe.id);

  if (index === -1) {
    this.favorites.push({ id: recipe.id, title: recipe.title });
  } else {
    this.favorites.splice(index, 1);
  }

  localStorage.setItem('favorites', JSON.stringify(this.favorites));
}

}
