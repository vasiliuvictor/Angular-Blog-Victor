export interface Author {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  publishedAt: Date;
  readTime: number;
  author: Author;
  featured?: boolean;
}

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}