import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MenuBarComponent } from '../../general-components/menu-bar/menu-bar.component';


@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, MenuBarComponent],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public results: any,
    public dialogRef: MatDialogRef<ProjectModalComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }

  imageExists(imageUrl: string): boolean {
    const http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
  }
}
