import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public results: any,
    public dialogRef: MatDialogRef<ProjectModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  imageExists(imageUrl: string): boolean {
    const http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
  }
}
