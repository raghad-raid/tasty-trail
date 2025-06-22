import { Component, Input } from '@angular/core';
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
export class RecipeGridComponent {
  @Input() recipes: Recipe[] = [];


}
