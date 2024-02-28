import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commit } from './github.commitModel.component';
import { TimeAgoService } from '../serviceComponents/time-ago.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent {
  results: { date: string; commits: Commit[] }[] = [];
  loadingState: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchGHData();
  }
  
  fetchGHData() {
    this.http.get<any>('http://localhost:3000/github')
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
        error => {
          console.error('Error:', error);
        },
        () => {
          this.loadingState = false;
        }
      );
  }
}