import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() totalRecipes = 0;
  @Input() currentPage = 1;
  @Input() maxPages = 4;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return [1, 2];
  }

  onPageChange(page: number) {
    if (page < 1) return;
    this.pageChange.emit(page);
  }
}
