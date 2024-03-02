import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ConnectionsComponent } from '../connections/connections.component'; 

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ConnectionsComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  name: string = "Danh Le";
  location: string = "Calgary, AB"
  description: string  = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/summary_description.txt', { responseType: 'text' })
      .subscribe(data => {
        this.description = data;
      });
  }
}

