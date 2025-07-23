import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../shared/services/blog.service';
import { Post } from '../../../shared/models/post.model';
import { NewsletterFormComponent } from '../../../shared/components/newsletter-form/newsletter-form.component';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsletterFormComponent, PostCardComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: Post | null = null;
  relatedPosts: Post[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      }
    });
  }
  
  loadPost(slug: string): void {
    this.blogService.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post = post;
        this.loadRelatedPosts(post.category, post.id);
      },
      error: (error) => {
        console.error('Error loading post', error);
      }
    });
  }
  
  loadRelatedPosts(category: string, currentPostId: string): void {
    this.blogService.getRelatedPosts(category, currentPostId).subscribe({
      next: (posts) => {
        this.relatedPosts = posts;
      }
    });
  }
}