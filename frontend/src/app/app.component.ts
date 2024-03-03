import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkillsComponent } from './components/skills/skills.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { GithubComponent } from './components/github/github.component';
import { InfoComponent } from './components/info/info.component';
import { LeetcodeComponent } from './components/leetcode/leetcode.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectModalComponent } from './components/projects/project-modal/project-modal.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectModalComponent, ProjectsComponent, LeetcodeComponent, SkillsComponent, ConnectionsComponent, GithubComponent, InfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
