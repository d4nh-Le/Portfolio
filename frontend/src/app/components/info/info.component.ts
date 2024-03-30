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
  description_1st: string  = "My name is Danh Le, a junior software developer based in Calgary, Alberta, Canada. I have recently graduated from my college but my learning journey has yet to stop, in fact, this is just the beginning. Curiosity and Perseverance are what guide me on the steps of becoming a software developer."; 
  description_2nd: string = "I'm passionate about creating solutions that bring high values to the people around."
  

}

