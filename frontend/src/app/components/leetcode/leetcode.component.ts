import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { OnInit } from '@angular/core'; 
import { Submission } from './leetcode.submissionModel.component';  
import { TimeAgoService } from '../service-components/time-ago.service';
import { CommonModule } from '@angular/common';
import { retryWhen, delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.css'
})
export class LeetcodeComponent implements OnInit {
  results: Submission[] = [];
  loadingState: boolean = true;
  displayedResults: number = 4;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // dev mode: http://localhost:3000/leetcode
    this.http.get<any>('https://portfolio.danh-le.com/leetcode')
    .pipe(
      retryWhen(errors => errors.pipe(
        delay(3000), 
        take(3) 
      ))
    ).subscribe(
        data => {
          this.results = data.map((item: { title: string; titleSlug: string; timestamp: number; statusDisplay: string; lang: string; formattedDate: string; }) => ({
            title: item.title,
            titleSlug: item.titleSlug,
            timestamp: TimeAgoService.calculateTimeAgoMili(item.timestamp),
            statusDisplay: item.statusDisplay,
            language: item.lang,
            Date: item.formattedDate,
          }));
        },
        error => {
          console.error('Error:', error);
        },
        () => {
          this.loadingState = false;
        }
      );
  }
}