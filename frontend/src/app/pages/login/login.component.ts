import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadUser } from '../../store/actions/user.actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginComponent {

  loading: boolean = false;
  http = inject(HttpClient);
  private cookieService = inject(CookieService);

  constructor(private router: Router, private store: Store<AppState>) { }

  onSubmit(form: any) {

    this.loading = true;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Access-Control-Allow-Origin": "**"
    //   }),
    //   withCredentials: true
    // };

    const body = {
      email: form.value.email,
      password: form.value.password
    }

    const Url = `${environment.apiUrl}/login`;

    this.http.post(Url, body, {withCredentials: true}).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.token) {
          this.cookieService.set('auth_token', res.token, 1);
          const user = {
            id: res.user_id,
            name: res.name,
            email: res.email,
            applicationIds: []
          }

          this.cookieService.set('user_id', res.user_id, 1);
          this.cookieService.set('name', res.name, 1);
          this.store.dispatch(loadUser({ user }));
          alert('Login Successful');
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.loading = false;
        // Handle different error status codes
        if (err.status === 401) {
          alert('Invalid Credentials');
        }else if (err.status === 403) {
          alert('Please verify your email address.');
        }
        else if (err.status === 400) {
          alert('Bad Request - Please check the data you have entered.');
        } else if (err.status === 0) {
          alert('Network Error - Please check your internet connection.');
        } else if (err.status >= 500 && err.status < 600) {
          alert('Server Error - Please try again later.');
        } else {
          alert('Login Failed - An unknown error occurred.');
        }
        console.error('Login error:', err);
      }
    });
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
