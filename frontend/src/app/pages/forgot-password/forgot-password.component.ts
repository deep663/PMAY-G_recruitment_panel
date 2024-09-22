import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: any) {

    this.loading = true;
    if (form.invalid) {
      return;
    }

    this.http.post(`${environment.apiUrl}/password/forgot`, { email: this.email }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res) {
          this.errorMessage = null;
          alert('Password reset email sent. Please check your inbox.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message;
      }
    }
    );
  }
}
