import { selectSelectedPost } from './../../store/selectors/application.selectors';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { selectUserId } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-select-post',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './select-post.component.html',
  styleUrls: ['./select-post.component.css']
})
export class SelectPostComponent implements OnInit {
  appliedApplications: any[] = [];
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient, private store: Store, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications(): void {
    try {
      const userId = this.cookieService.get('user_id');
      const token = this.cookieService.get('auth_token');


      if (!token || !userId) {
        throw new Error('User authentication details not found.');
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Allow-Credentials': 'true',
        'Authorization': `Bearer ${token}`
      });

      this.http.get(`${environment.apiUrl}/FetchPostSelected/${userId}`, { headers: headers }).subscribe(
        {
          next: (response: any) => {
            // console.log(response);
            this.appliedApplications = response[0];
          },
          error: (err: HttpErrorResponse) => {
            this.handleError(err);
          }
        }
      );
    } catch (error : any) {
      this.errorMessage = error.message;
      console.log('Error during initialization:', error.message);
    }
  }

  continueApplication(applicationId: string): void {
      if (!applicationId) {
        throw new Error('Invalid application ID.');
      }

      this.router.navigate(['/home/application']);
  }

  // Method to handle API errors
  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.log('Client-side error:', error.error.message);
      this.errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      // Server-side error
      console.log(`Server-side error (status ${error.status}): ${error.message}`);
      switch (error.status) {
        case 401:
          this.errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 404:
          this.errorMessage = 'Data not found.';
          break;
        case 500:
          this.errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          this.errorMessage = 'An unexpected error occurred.';
      }
    }
  }
}
