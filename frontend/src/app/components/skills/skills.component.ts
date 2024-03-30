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
  skills_description1st: string = "Programming languages and frameworks that I am proficient in, yet.";
  skills_description2nd: string = "I am always eager to learn new technologies and improve my capabilities.";
}