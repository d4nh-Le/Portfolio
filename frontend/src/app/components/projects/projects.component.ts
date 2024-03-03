import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './projects.projectsModel.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  results: Project[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any>('http://localhost:3000/projects')
      .subscribe(
        (data: Project[]) => {
          this.results = data.map((project: any) => ({
            title: project.projectTitle,
            author: project.projectAuthors,
            technologies: project.technologies,
            description: project.projectDescription,
            date: project.projectDate,
            images: project.projectImages
          }));
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

openModal(result: Project, event: Event) {
  event.stopPropagation();
  const dialogRef = this.dialog.open(ProjectModalComponent, {
    data: result
  });
  event.preventDefault();
}
}
