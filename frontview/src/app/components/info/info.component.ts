import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
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
