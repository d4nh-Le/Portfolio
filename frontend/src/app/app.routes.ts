import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentActivityComponent } from './components/general-components/containers/recent-activity/recent-activity.component';
import { HomeContainerComponent } from './components/general-components/containers/home-container/home-container.component';
import { ProjectContainerComponent } from './components/general-components/containers/project-container/project-container.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeContainerComponent },
  { path: 'activities', component: RecentActivityComponent },
  { path: 'projects', component: ProjectContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }