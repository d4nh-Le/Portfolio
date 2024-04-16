import { Component, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  @ViewChild('navLinks', { static: false }) navLinks!: ElementRef;

  toggleDropdown(): void {
    const navLinks = this.navLinks.nativeElement;
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      navLinks.classList.add('show');
    } else {
      navLinks.classList.remove('show');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
  const navLinks = this.navLinks.nativeElement;
  if (event.target.innerWidth >= 768) {
    navLinks.style.display = 'flex';
  } else {
    navLinks.style.display = 'none';
  }
}
}