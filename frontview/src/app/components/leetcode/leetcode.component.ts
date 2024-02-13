import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Submission } from './leetcode.submissionModel.component';
import { TimeAgoService } from '../serviceComponents/time-ago.service';

@Component({
  selector: 'app-leetcode',
  templateUrl: './leetcode.component.html',
  styleUrls: ['./leetcode.component.css']
})

export class LeetcodeComponent implements OnInit {
  results: Submission[] = [];
  loadingState: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any>('http://localhost:3000/leetcode')
      .subscribe(
        data => {
          this.results = data.map((item: { title: string; titleSlug: string; timestamp: number; statusDisplay: string; lang: string; formattedDate: string; }) => ({
            title: item.title,
            titleSlug: item.titleSlug,
            timestamp: TimeAgoService.calculateTimeAgoMili(item.timestamp),
            statusDisplay: item.statusDisplay,
            language: item.lang,
            Date: item.formattedDate,
        }))},
        error => {
          console.error('Error:', error);
        },
        () => {
          this.loadingState = false;
        }
      );
  }
}