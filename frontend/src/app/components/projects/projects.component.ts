import { Component, EventEmitter, Output} from '@angular/core';
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

  constructor(public dialog: MatDialog, private http: HttpClient) {}
  clickPosition: { top: number, left: number } = { top: 0, left: 0 };
  // @Output() modalOpen = new EventEmitter<boolean>();
  

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
            detail: project.projectDetail,
            date: project.projectDate,
            images: project.projectImages,
            url: project.projectLink
          }));
        },
        (error: any) => { 
          console.error('Error:', error);
        }
      );
  }


openModal(result: Project, event: MouseEvent) {
  // this.modalOpen.emit(true)
  // const rect = (event.target as HTMLElement).getBoundingClientRect();
  //     this.clickPosition = {
  //       top: rect.top + window.scrollY,
  //       left: rect.left + window.scrollX
  //     }
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: result,
      // position: {
      //   top: `${this.clickPosition.top}px`,
      //   left: `${this.clickPosition.left}px`
      // }
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.modalOpen.emit(false);
    });
}
}
