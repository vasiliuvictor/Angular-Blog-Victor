import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: ':slug',
    component: BlogDetailComponent
  },
  {
    path: 'category/:category',
    component: BlogListComponent
  }
];