import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MenuBarComponent } from '../../general-components/menu-bar/menu-bar.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, MenuBarComponent],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  modalIcons: any = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public results: any,
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    private http: HttpClient,
    private sanitizer: DomSanitizer) {}

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.http.get('../../../../assets/fonts/tech_icons.json').subscribe(data => {
      this.modalIcons = data;
    });
  }

  getTrustedHTML(svgString: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  imageExists(imageUrl: string): boolean {
    const http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
  }

  logAndReturn(value: any): any {
    console.log(value);
    return value;
  }
}
