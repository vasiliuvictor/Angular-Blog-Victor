import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-filter">
      <ul class="category-list">
        <li class="category-item">
          <button 
            class="category-button" 
            [class.active]="!selectedCategory"
            (click)="onCategoryClick('')"
          >
            All Posts
          </button>
        </li>
        <li class="category-item" *ngFor="let category of categories">
          <button 
            class="category-button" 
            [class.active]="selectedCategory === category"
            (click)="onCategoryClick(category)"
          >
            {{ category }}
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .category-item {
      margin-bottom: 0.5rem;
    }
    
    .category-button {
      background: none;
      border: none;
      padding: 0.5rem 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      text-align: left;
      color: var(--color-gray-700);
      font-size: 0.95rem;
      transition: all var(--duration-fast) ease;
      border-radius: var(--radius-md);
      position: relative;
      padding-left: 0.5rem;
      text-transform: capitalize;
    }
    
    .category-button::before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 4px;
      border-color: transparent transparent transparent var(--color-primary);
      opacity: 0;
      transition: all var(--duration-fast) ease;
    }
    
    .category-button:hover {
      color: var(--color-primary);
      padding-left: 0.75rem;
      background-color: var(--color-gray-100);
    }
    
    .category-button.active {
      color: var(--color-primary);
      font-weight: 600;
      padding-left: 1rem;
    }
    
    .category-button.active::before {
      opacity: 1;
      left: 0;
    }
  `]
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = '';
  @Output() categorySelected = new EventEmitter<string>();
  
  onCategoryClick(category: string): void {
    this.categorySelected.emit(category);
  }
}