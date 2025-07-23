import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { Post } from '../../shared/models/post.model';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { FeaturedPostComponent } from '../../shared/components/featured-post/featured-post.component';
import { NewsletterFormComponent } from '../../shared/components/newsletter-form/newsletter-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    PostCardComponent, 
    FeaturedPostComponent,
    NewsletterFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredPost: Post | null = null;
  recentPosts: Post[] = [];
  
  constructor(private blogService: BlogService) {}
  
  ngOnInit(): void {
    this.loadFeaturedPost();
    this.loadRecentPosts();
  }
  
  loadFeaturedPost(): void {
    this.blogService.getFeaturedPost().subscribe({
      next: (post) => {
        this.featuredPost = post;
      }
    });
  }
  
  loadRecentPosts(): void {
    this.blogService.getRecentPosts().subscribe({
      next: (posts) => {
        this.recentPosts = posts;
      }
    });
  }
}