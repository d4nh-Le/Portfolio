import { Component, ViewChild, ElementRef } from '@angular/core';

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
  }
}