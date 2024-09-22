import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './upload-documents.component.html',
  styleUrl: './upload-documents.component.css'
})
export class UploadDocumentsComponent {
  selectedFiles: { [key: string]: File } = {};
  photoPreview: string | null = null;
  signaturePreview: string | null = null;
  uploadStatus: string | null = null;

  onFileSelected(event: any, type: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[type] = file;
      this.generatePreview(file, type);
    }
  }

  generatePreview(file: File, type: string): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (type === 'photo') {
        this.photoPreview = e.target.result;
      } else if (type === 'signature') {
        this.signaturePreview = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onUpload(): void {
    if (this.selectedFiles['photo'] && this.selectedFiles['signature']) {
      // Implement your upload logic here
      this.uploadStatus = 'Files uploaded successfully!';
    } else {
      this.uploadStatus = 'Please select both files before uploading.';
    }
  }

}

