import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeAgoService {
  constructor() { }

  static calculateTimeAgo(dateString: string): string {
    const date = new Date(dateString);

    const difference = Date.now() - date.getTime();

    const seconds = Math.floor(difference / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
    for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
      const intervalCount = Math.floor(seconds / intervalSeconds);
      if (intervalCount > 0) {
        return `${intervalCount} ${intervalName}${intervalCount !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  static calculateTimeAgoMili(timestamp: number): string {
     const givenTime = new Date(timestamp * 1000);

     const currentTime = new Date();

     const difference = currentTime.getTime() - givenTime.getTime();
 
     const secondsDifference = Math.floor(difference / 1000);
 
     const years = Math.floor(secondsDifference / (3600 * 24 * 365));
     const months = Math.floor(secondsDifference / (3600 * 24 * 30));
     const days = Math.floor(secondsDifference / (3600 * 24));
     const hours = Math.floor(secondsDifference / 3600);
     const minutes = Math.floor(secondsDifference / 60);
 
     if (years > 0) {
         return years + " years ago";
     } else if (months > 0) {
         return months + " months ago";
     } else if (days > 0) {
         return days + " days ago";
     } else if (hours > 0) {
         return hours + " hours ago";
     } else if (minutes > 0) {
         return minutes + " minutes ago";
     } else {
         return "Just now";
     }
  }
}