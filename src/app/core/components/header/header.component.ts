import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log(this.isMobileMenuOpen);
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
  
  onSearch(searchTerm: string) {
    this.closeMobileMenu();
    // Search functionality to be implemented
  }
}