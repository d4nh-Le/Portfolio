import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { ProjectsComponent } from '../../../projects/projects.component';
import { FooterBarComponent } from '../../footer-bar/footer-bar.component';


@Component({
  selector: 'app-project-container',
  standalone: true,
  imports: [ProjectsComponent, MenuBarComponent, FooterBarComponent],
  templateUrl: './project-container.component.html',
  styleUrl: './project-container.component.css'
})
export class ProjectContainerComponent {

}
