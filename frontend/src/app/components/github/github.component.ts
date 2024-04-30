import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TimeAgoService } from '../service-components/time-ago.service';
import { Commit } from './github.commitModel.component';

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github.component.html',
  styleUrl: './github.component.css'
})
export class GithubComponent {
  results: { date: string; commits: Commit[] }[] = [];
  loadingState: boolean = true;
  displayedResults = 4;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.fetchGHData();
  }
  
  fetchGHData() {
    this.fetchDataFromServer();
    }

    fetchDataFromServer() {
    // dev mode: http://localhost:3000/github
    this.http.get<any>('https://portfolio.danh-le.com/github')
      .subscribe(
      (data: any[]) => {
        this.results = data.map(item => ({
        date: item.date,
        commits: item.commits.map((commit: any) => ({
          repository: {
          name: commit.repository.name,
          owner: commit.repository.owner.login
          },
          commitMessage: commit.message,
          commitDate: new Date(commit.committedDate),
          commitAgo: TimeAgoService.calculateTimeAgo(commit.committedDate),
        }))
        }));
      },
      (error: any) => {
        console.error('Error:', error);
      },
      () => {
        this.loadingState = false;
      }
      );
    }
  }