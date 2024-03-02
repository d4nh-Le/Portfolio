import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  languages: string[] = [];
  frameworks: string[] = [];
  services: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/skills.txt', { responseType: 'text' })
      .subscribe(
        data => {
          const lines = data.split('\n');

          this.languages = lines[0].split(',').map(skill => skill.trim());
          this.frameworks = lines[1].split(',').map(skill => skill.trim());
          this.services = lines[2].split(',').map(skill => skill.trim());
        },
        error => {
          console.error('Error fetching skills:', error);
        }
      );
  }
}