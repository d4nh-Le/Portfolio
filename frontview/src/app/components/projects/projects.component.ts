import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './projects.projectsModel.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  results: Project[] = [];

  constructor(private http: HttpClient) { }

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

  imageExists(imageUrl: string): boolean {
    const http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
  }
}
