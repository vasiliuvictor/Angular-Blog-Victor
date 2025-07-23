import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="container">
        <div class="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <div class="actions">
            <a routerLink="/" class="btn btn-primary">Go Home</a>
            <a routerLink="/blog" class="btn btn-secondary">Explore Blog</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 70px);
      padding-top: 70px;
      text-align: center;
    }
    
    .not-found-content {
      max-width: 600px;
      margin: 0 auto;
      padding: var(--space-4);
    }
    
    h1 {
      font-size: 6rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: var(--space-1);
      line-height: 1;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: var(--space-3);
      color: var(--color-gray-900);
    }
    
    p {
      font-size: 1.2rem;
      color: var(--color-gray-600);
      margin-bottom: var(--space-4);
    }
    
    .actions {
      display: flex;
      gap: var(--space-2);
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 5rem;
      }
      
      h2 {
        font-size: 1.5rem;
      }
    }
    
    @media (max-width: 480px) {
      h1 {
        font-size: 4rem;
      }
      
      .actions {
        flex-direction: column;
      }
    }
  `]
})
export class NotFoundComponent {}