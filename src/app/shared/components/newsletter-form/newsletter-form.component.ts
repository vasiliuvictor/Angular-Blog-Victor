import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="newsletter-form-container">
      <form [formGroup]="newsletterForm" (ngSubmit)="onSubmit()" class="newsletter-form">
        <div class="form-input-container">
          <input 
            type="email" 
            formControlName="email" 
            placeholder="Your email address" 
            [class.error]="isEmailInvalid()"
            aria-label="Email address for newsletter"
          />
          <div *ngIf="isEmailInvalid()" class="error-message">
            Please enter a valid email address
          </div>
        </div>
        
        <button 
          type="submit" 
          class="subscribe-button"
          [disabled]="newsletterForm.invalid || isSubmitting"
        >
          <span *ngIf="!isSubmitting">Subscribe</span>
          <span *ngIf="isSubmitting">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </span>
        </button>
      </form>
      
      <div *ngIf="subscribed" class="success-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Thanks for subscribing!</span>
      </div>
    </div>
  `,
  styles: [`
    .newsletter-form-container {
      width: 100%;
    }
    
    .newsletter-form {
      display: flex;
      gap: 0.5rem;
    }
    
    .form-input-container {
      flex-grow: 1;
      position: relative;
    }
    
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-300);
      border-radius: var(--radius-md);
      font-family: var(--font-sans);
      font-size: 1rem;
      transition: all var(--duration-fast) ease;
    }
    
    input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.3);
    }
    
    input.error {
      border-color: var(--color-error);
    }
    
    .error-message {
      position: absolute;
      color: var(--color-error);
      font-size: 0.75rem;
      bottom: -1.25rem;
      left: 0;
    }
    
    .subscribe-button {
      padding: 0 1.5rem;
      background-color: var(--color-primary);
      color: white;
      font-weight: 500;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--duration-fast) ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
    }
    
    .subscribe-button:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
    
    .subscribe-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .success-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      color: var(--color-success);
      font-weight: 500;
      animation: fadeIn var(--duration-normal) ease;
    }
    
    .spinner {
      animation: rotate 2s linear infinite;
      width: 20px;
      height: 20px;
    }
    
    .path {
      stroke: white;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 480px) {
      .newsletter-form {
        flex-direction: column;
      }
      
      .subscribe-button {
        width: 100%;
        padding: 0.75rem;
      }
    }
  `]
})
export class NewsletterFormComponent {
  newsletterForm: FormGroup;
  isSubmitting = false;
  subscribed = false;
  
  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  isEmailInvalid(): boolean {
    const control = this.newsletterForm.get('email');
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  
  onSubmit(): void {
    if (this.newsletterForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.subscribed = true;
        this.newsletterForm.reset();
        
        // Reset subscribed state after 5 seconds
        setTimeout(() => {
          this.subscribed = false;
        }, 5000);
      }, 1500);
    } else {
      this.newsletterForm.get('email')?.markAsTouched();
    }
  }
}