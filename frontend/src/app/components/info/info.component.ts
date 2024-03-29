import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  name: string = "Danh Le";
  location: string = "Calgary, AB"
  description_en: string  = "My name is Danh Le, a junior software developer based in Calgary, Alberta, Canada. I'm passionate about creating solutions that bring high values to the people around.";
}

