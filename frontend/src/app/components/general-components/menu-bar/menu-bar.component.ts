import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  @ViewChild('navLinks', { static: false }) navLinks!: ElementRef;
  dropdownOpen = false;

  toggleDropdown(): void {
    const navLinks = this.navLinks.nativeElement;
    navLinks.style.visibility = navLinks.style.visibility === 'visible' ? 'hidden' : 'visible';
    if (navLinks.style.visibility === 'visible') {
      navLinks.classList.add('show');
      this.dropdownOpen = true;
    } else {
      navLinks.classList.remove('show');
      this.dropdownOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
  const navLinks = this.navLinks.nativeElement;
  if (event.target.innerWidth >= 768) {
    navLinks.style.visibility = 'visible';
  } else {
    navLinks.style.visibility = 'hidden';
  }
}
}