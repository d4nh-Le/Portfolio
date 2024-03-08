import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class singleLoadService {
    private projectsData: ReplaySubject<any[]> = new ReplaySubject(1);
    private githubData: ReplaySubject<any[]> = new ReplaySubject(1);
    private leetcodeData: ReplaySubject<any[]> = new ReplaySubject(1);
    private dataFetched = false;

        constructor(private http: HttpClient) { }

        getProjectsData(): Observable<any[]> {
            if (!this.dataFetched) {
              this.http.get<any[]>('http://localhost:3000/projects').pipe(
                catchError(error => {
                  console.error('Error fetching projects data:', error);
                  return of([]);
                })
              ).subscribe(data => {
                this.projectsData.next(data);
                this.dataFetched = true;
              });
            }
            return this.projectsData.asObservable();
          }

        getGitHubData(): Observable<any[]> {
            if (!this.githubData.observers.length) {
                this.http.get<any[]>('http://localhost:3000/github').pipe(
                    catchError(error => {
                        console.error('Error fetching projects data:', error);
                        return of([]);
                    })
                ).subscribe(data => this.githubData.next(data));
            }
            return this.githubData.asObservable();
        }

        getLeetcodeData(): Observable<any[]> {
            if (!this.leetcodeData.observers.length) {
                this.http.get<any[]>('http://localhost:3000/leetcode').pipe(
                    catchError(error => {
                        console.error('Error fetching projects data:', error);
                        return of([]);
                    })
                ).subscribe(data => this.leetcodeData.next(data));
            }
            return this.leetcodeData.asObservable();
        }
}