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
  }