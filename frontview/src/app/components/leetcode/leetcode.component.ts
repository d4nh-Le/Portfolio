import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leetcode',
  templateUrl: './leetcode.component.html',
  styleUrls: ['./leetcode.component.css']
})

export class LeetcodeComponent implements OnInit {
  result: any = '';
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any>('http://localhost:3000/leetcode')
      .subscribe(
        data => {
          // Handle successful response
          console.log('Received data:', data);
          this.result = data;
        },
        error => {
          // Handle error
          console.error('Error:', error);
        },
        () => {
          // Finalize request (complete or error)
          this.loading = false;
        }
      );
  }
}