import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
}