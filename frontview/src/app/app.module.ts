import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeetcodeComponent } from './components/leetcode/leetcode.component';
import { GithubComponent } from './components/github/github.component';
import { InfoComponent } from './components/info/info.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './components/skills/skills.component';

@NgModule({
  declarations: [
    AppComponent,
    LeetcodeComponent,
    GithubComponent,
    InfoComponent,
    ConnectionsComponent,
    ProjectsComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
