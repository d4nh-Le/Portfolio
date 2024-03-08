import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ConnectionsComponent } from '../connections/connections.component';
import { MenuBarComponent } from '../general-components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ConnectionsComponent, MenuBarComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  name: string = "Danh Le";
  location: string = "Calgary, AB"
  description_en: string  = "My name is Danh Le, a junior software developer based in Calgary, Alberta, Canada. I'm passionate about creating solutions that bring high values to the people around.";
  description_fr: string = "Je m'appelle Danh Le, un jeune développeur de logiciels basé à Calgary, Alberta, Canada. Je suis passionné par la création de solutions qui apportent une grande valeur aux personnes autour.";
  constructor(private http: HttpClient) {}
}

