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
  results: Commit[] = [];
  loadingState: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchGHData();
  }
  
  fetchGHData() {
    this.http.get<any>('http://localhost:3000/github')
      .subscribe(
        data => {
          this.results = data.map((item: { repository: { name: any; owner: { login: any; }; }; message: any; committedDate: any}) => ({
            repository: {
              name: item.repository.name,
              owner: item.repository.owner.login
            },
            commitMessage: item.message,
            commitDate: new Date(item.committedDate),
            commitAgo: TimeAgoService.calculateTimeAgo(item.committedDate),
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