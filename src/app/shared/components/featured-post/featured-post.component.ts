import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-featured-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.scss']
})
export class FeaturedPostComponent {
  @Input() post!: Post;
}