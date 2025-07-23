import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../shared/services/blog.service';
import { Post } from '../../../shared/models/post.model';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';
import { CategoryFilterComponent } from '../../../shared/components/category-filter/category-filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent, CategoryFilterComponent, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts: Post[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  categoryTitle: string = '';
  categoryDescription: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  sortOption: string = 'latest';
  
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.loadCategories();
    
    this.route.params.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.setCategoryInfo(this.selectedCategory);
      } else {
        this.selectedCategory = '';
        this.categoryTitle = '';
        this.categoryDescription = '';
      }
      
      this.currentPage = 1;
      this.loadPosts();
    });
    
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.currentPage = parseInt(params['page'] || '1', 10);
      this.loadPosts();
    });
  }
  
  loadPosts(): void {
    this.blogService.getPosts(
      this.currentPage,
      this.selectedCategory,
      this.searchTerm,
      this.sortOption
    ).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.totalPages = response.totalPages;
      }
    });
  }
  
  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }
  
  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.setCategoryInfo(category);
    this.currentPage = 1;
    this.loadPosts();
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }
  
  onSortChange(): void {
    this.loadPosts();
  }
  
  resetFilters(): void {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.sortOption = 'latest';
    this.currentPage = 1;
    this.categoryTitle = '';
    this.categoryDescription = '';
    this.loadPosts();
  }
  
  setCategoryInfo(category: string): void {
    switch(category) {
      case 'technology':
        this.categoryTitle = 'Technology';
        this.categoryDescription = 'Latest in tech innovations and digital trends.';
        break;
      case 'design':
        this.categoryTitle = 'Design';
        this.categoryDescription = 'Insights on UX/UI and creative processes.';
        break;
      case 'lifestyle':
        this.categoryTitle = 'Lifestyle';
        this.categoryDescription = 'Wellness, travel, and personal growth.';
        break;
      case 'productivity':
        this.categoryTitle = 'Productivity';
        this.categoryDescription = 'Work smarter and optimize your time.';
        break;
      default:
        this.categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
        this.categoryDescription = `Articles related to ${this.categoryTitle}.`;
    }
  }
}