import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'recipe/:id', component: RecipeDetailComponent },
];