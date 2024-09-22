import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  isRegistered: boolean = false;
  http = inject(HttpClient);

  constructor(private router: Router) { }

  onSubmit(form: any) {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.loading = true;

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "**",
        "Content-Type": "application/json",
      }),
    };

    const body = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    const URL = `${environment.apiUrl}/register`;

    this.http.post(URL, body, httpOptions).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.status === 201) {
          alert('Successfully Registered!');
          this.isRegistered = true;
          this.router.navigate(['/login']);
        } else {
          alert('Unexpected response from the server.');
        }
      },
      error: (err) => {
        this.loading = false;

        // Check for network errors
        if (err.status === 0) {
          alert('Network error: Please check your internet connection.');
          console.log('Network error:', err);
          return;
        }

        // Handle 4xx client errors
        if (err.status >= 400 && err.status < 500) {
          if (err.status === 422) {
            alert('Email already exists!');
          } else if (err.status === 400) {
            alert('Bad request: Please check the data you entered.');
          } else if (err.status === 401) {
            alert('Unauthorized: Please check your credentials.');
          } else {
            alert(`Client error: ${err.status}. Please try again.`);
          }
          console.log('Client error:', err);
          return;
        }

        // Handle 5xx server errors
        if (err.status >= 500 && err.status < 600) {
          alert('Server error: Please try again later.');
          console.log('Server error:', err);
          return;
        }

        // Fallback for unexpected errors
        alert('Registration Failed! Please try again.');
        console.log('Unexpected error:', err);
      },
      complete: () => {
        // Clear form
        form.resetForm();
      }
    });

  }


}
