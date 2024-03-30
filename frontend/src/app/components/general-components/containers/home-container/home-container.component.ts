import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { InfoComponent } from '../../../info/info.component';   
import { SkillsComponent } from '../../../skills/skills.component';
import { FooterBarComponent } from '../../footer-bar/footer-bar.component';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [MenuBarComponent, InfoComponent, SkillsComponent, FooterBarComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.css'
})
export class HomeContainerComponent {

}
