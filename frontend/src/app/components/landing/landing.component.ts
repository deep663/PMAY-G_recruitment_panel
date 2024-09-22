import { Component } from '@angular/core';
import { SelectPostComponent } from "../select-post/select-post.component";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadApplication } from '../../store/actions/application.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SelectPostComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'] // Fixed typo here (should be styleUrls instead of styleUrl)
})
export class LandingComponent{
  isLogin: boolean = false;
  userId: any = '';

  constructor(private router: Router, private cookieService: CookieService, private store: Store<AppState>, private https: HttpClient) {
    this.isLogin = !!this.cookieService.get('auth_token');
    this.userId = this.cookieService.get('user_id');
  }

  onApply(applyedPost: number) {
    if (!this.isLogin) {
      this.router.navigateByUrl('/login');
    } else if (applyedPost === 1) {
      this.applyForPost('State Program Manager');
    } else if (applyedPost === 2) {
      this.applyForPost('State Program Data Analysis & Executive Management');
    } else if (applyedPost === 3) {
      this.applyForPost('IT Assistant');
    } else {
      alert('Invalid post selection.');
    }
  }

  applyForPost(post: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*", // Adjust this as necessary
        "Content-Type": "application/json",
        "Allow-Credentials": "true",
        "Authorization": `Bearer ${this.cookieService.get('auth_token')}`
      }),
    };

    this.https.post(`${environment.apiUrl}/postSelected`,
      { user_id: this.userId, selected_post: post },
      { withCredentials: true, ...httpOptions }
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.store.dispatch(loadApplication({ application: { applicationId: '', selectedPost: post } }));
        alert('Successfully Applied!');
        this.router.navigateByUrl('/home/select-post');
      },
      error: (err) => {
        if (err.status === 409) {
          alert('You have already applied for this post.');
          this.router.navigateByUrl('/home/select-post');
        } else {
          this.handleError(err);
        }
      }
    });
  }

  handleError(error: any) {
    if (error.status === 401) {
      alert('Unauthorized. Please log in again.');
    } else if (error.status === 400) {
      alert('Bad request. Please check your input and try again.');
    } else if (error.status === 500) {
      alert('Server error. Please try again later.');
    } else if (error.status === 0) {
      alert('Network error. Please check your internet connection.');
    } else {
      alert('An unexpected error occurred.');
    }
    console.error('Error occurred during form submission:', error);
  }

}
