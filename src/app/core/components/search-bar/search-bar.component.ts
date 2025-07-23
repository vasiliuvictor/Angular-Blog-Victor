import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';
  
  constructor(private router: Router) {}
  
  submitSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm);
      this.router.navigate(['/blog'], { queryParams: { search: this.searchTerm } });
      this.searchTerm = '';
    }
  }
}