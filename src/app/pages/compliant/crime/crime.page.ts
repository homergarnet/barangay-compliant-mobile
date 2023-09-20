import { Component, OnInit } from '@angular/core';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';

interface FileWithPreview {
  dataURL: string;
  type: string;
  name: string;
}

@Component({
  selector: 'app-crime',
  templateUrl: './crime.page.html',
  styleUrls: ['./crime.page.scss'],
})
export class CrimePage implements OnInit {

  files: FileWithPreview[] = [];
  maxFiles = 5; // Maximum number of files allowed

  onFilesSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFiles = inputElement.files;

    if (selectedFiles) {
      // Check if adding the selected files exceeds the maximum limit
      if (this.files.length + selectedFiles.length <= this.maxFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];

          if (file) {
            this.files.push({
              dataURL: URL.createObjectURL(file),
              type: file.type,
              name: file.name,
            });
          }
        }
      } else {
        // Notify the user if the maximum limit is exceeded
        // alert(`You can only upload up to ${this.maxFiles} files.`);
        this.toastrCustomService.showError(`You can only upload up to ${this.maxFiles} files.`, 'Error!');

      }
    }
  }

  removeFile(file: FileWithPreview): void {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  constructor(private toastrCustomService: ToastrCustomService) { }

  ngOnInit() {
  }

}
