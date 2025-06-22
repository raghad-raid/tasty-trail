import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  onInputChange(value: string) {
    this.searchQueryChange.emit(value);
  }

  onSearch() {
    this.search.emit();
  }
}
