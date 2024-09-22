import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent implements OnInit {
  userDetails: any = {};
  http = inject(HttpClient);
  isPreview: boolean = true;
  user_id: any = localStorage.getItem('userId');

  constructor(private router: Router) { };

  ngOnInit(): void {

    if (this.user_id) {
      this.http.get(`${environment.apiUrl}/user-data/${this.user_id}`).subscribe((res: any) => {
        this.userDetails = res;

        // console.log(this.userDetails);
      })
    }
  }

  onSubmit() {
    this.http.post(`${environment.apiUrl}/status`, {
      user_id: this.user_id,
      status: 'submitted',
    }).subscribe(
      {
        next: (res: any) => {
          if (res) {
            alert('Application Submitted Successfully');
            localStorage.setItem('applicationSubmitted', '1');
            this.router.navigate(['/home/status']);
          }
        }, error: (err) => {
          console.log(err);
          alert('Something went wrong!');
        }
      })
  }

  editDetails() {
    // Logic to go back to edit mode if needed
    this.isPreview = false;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  formatKey(key: string): string {
    return key.replace(/_/g, ' ').replace(/^./, str => str.toUpperCase());
  }

  printPage() {
    window.print();
  }

}
