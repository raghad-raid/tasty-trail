import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  @Input() totalRecipes = 0;
  @Input() currentPage = 1;
  @Input() maxPages = 4;
  @Output() pageChange = new EventEmitter<number>();

    favorites: { id: string, title: string }[] = [];
    showFavorites = false;
    favoriteRecipes: any[] = [];
     pageSize: number = 8;

   ngOnInit(): void {
   this.loadFavorites();
  }
  
  loadFavorites(): void {
  const stored = localStorage.getItem('favorites');
    this.favoriteRecipes = stored ? JSON.parse(stored) : [];
}

  get pages(): number[] {
    return [1, 2];
  }

  onPageChange(page: number) {
     const totalPages = Math.ceil(this.totalRecipes / this.pageSize);

  if (page < 1 || page > totalPages) return; 

  this.currentPage = page;
  this.pageChange.emit(page);
  }
    toggleFavorites() {
     this.showFavorites = !this.showFavorites;
    if (this.showFavorites) {
      this.loadFavorites(); 
    }
  }
  }
