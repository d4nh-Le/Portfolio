import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './components/service-components/loader.service';
import { LoadingBarComponent } from './components/general-components/loading-bar/loading-bar.component';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarComponent,  CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = true;
    });
  }
}
