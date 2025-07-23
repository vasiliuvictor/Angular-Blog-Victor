import { Injectable, inject } from '@angular/core';
import { collection, collectionData, doc, docData, query, where, orderBy, limit as limitTo } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Post, PostsResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  protected categoriesRef = collection(this.firestore, 'categories');
  protected postsRef = collection(this.firestore, 'posts');
  
  constructor(private firestore: Firestore) {}

  getCategories(): Observable<string[]> {
    const q = query(this.categoriesRef);
    return collectionData(q).pipe(
      map(categories => categories.map(cat => cat['name']))
    );
  }

  getFeaturedPost(): Observable<Post> {
    const q = query(this.postsRef, where('featured', '==', true), limitTo(1));
    return collectionData(q).pipe(
      map(posts => {
        const featuredPost = posts[0];
        featuredPost.publishedAt = this.convertTimeStampToDate(featuredPost.publishedAt);
        return posts[0] as Post})
    );
  }

  getRecentPosts(limit: number = 3): Observable<Post[]> {
    const q = query(this.postsRef, orderBy('publishedAt', 'desc'), limitTo(limit));
    return collectionData(q, { idField: 'id' }).pipe(
      map(postList => {
        postList = postList.map(post => {
          post.publishedAt = this.convertTimeStampToDate(post.publishedAt);
          return post;
        });
        return postList;
    })) as Observable<Post[]>;
  }

  getPosts(
    page: number = 1,
    category: string = '',
    searchTerm: string = '',
    sortOption: string = 'latest'
  ): Observable<PostsResponse> {
    let q = query(this.postsRef);

    if (category) {
      q = query(q, where('category', '==', category));
    }

    switch(sortOption) {
      case 'latest':
        q = query(q, orderBy('publishedAt', 'desc'));
        break;
      case 'oldest':
        q = query(q, orderBy('publishedAt', 'asc'));
        break;
      case 'title-asc':
        q = query(q, orderBy('title', 'asc'));
        break;
      case 'title-desc':
        q = query(q, orderBy('title', 'desc'));
        break;
    }

    return collectionData(q, { idField: 'id' }).pipe(
      map(posts => {
        let filteredPosts = [...posts].map(post => {
          post.publishedAt = this.convertTimeStampToDate(post.publishedAt);
          return post;
        });
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredPosts = filteredPosts.filter(post => 
            post['title'].toLowerCase().includes(term) || 
            post['excerpt'].toLowerCase().includes(term) ||
            post['content'].toLowerCase().includes(term) ||
            post['tags']?.some((tag: string) => tag.toLowerCase().includes(term))
          );
        }
        
        const pageSize = 6;
        const totalPages = Math.ceil(filteredPosts.length / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);
        
        return {
          posts: paginatedPosts as Post[],
          totalPages,
          currentPage: page
        };
      })
    );
  }

  getPostBySlug(slug: string): Observable<Post> {
    const q = query(this.postsRef, where('slug', '==', slug), limitTo(1));
    return collectionData(q, { idField: 'id' }).pipe(
      map(posts => {
        if (!posts.length) throw new Error('Post not found');
        posts[0].publishedAt = this.convertTimeStampToDate(posts[0].publishedAt);
        return posts[0] as Post;
      })
    );
  }

  getRelatedPosts(category: string, currentPostId: string, limit: number = 3): Observable<Post[]> {
    const q = query(
      this.postsRef,
      where('category', '==', category),
      where('id', '!=', currentPostId),
      limitTo(limit)
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map(postList => {
        postList = postList.map(post => {
          post.publishedAt = this.convertTimeStampToDate(post.publishedAt);
          return post;
        });
        return postList;
    })) as Observable<Post[]>;
  }

  convertTimeStampToDate(date: Date | Timestamp): Date {
    let dateToReturn: Date = new Date();
    if (date) {
      if (date instanceof Timestamp) {
        dateToReturn = date.toDate();
      } else if (date instanceof Date) {
        dateToReturn = date;
      } else {
        console.log('Unknown type of date, use sysdate for now');
        dateToReturn = new Date();
      }
    }
    return dateToReturn;
  }
}