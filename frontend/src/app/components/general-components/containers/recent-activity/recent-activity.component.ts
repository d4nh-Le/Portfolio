import { Component } from '@angular/core';
import { GithubComponent } from '../../../github/github.component';
import { LeetcodeComponent } from '../../../leetcode/leetcode.component';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [GithubComponent, LeetcodeComponent, MenuBarComponent],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css'
})
export class RecentActivityComponent {

}
