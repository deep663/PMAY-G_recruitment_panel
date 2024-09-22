import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  http = inject(HttpClient);
  isLoading = false;
  submissionError = '';

  constructor(private router: Router) { }

  onSubmit(personalDetailsForm: any) {
    this.submissionError = '';
    this.isLoading = true;

    if (personalDetailsForm.invalid) {
      this.submissionError = 'Please fill in all required fields correctly.';
      this.isLoading = false;
      return;
    }

    const personalDetails = {
      user_id: localStorage.getItem('userId'),
      first_name: personalDetailsForm.value.firstName,
      last_name: personalDetailsForm.value.lastName,
      father_name: personalDetailsForm.value.fatherName,
      mother_name: personalDetailsForm.value.motherName,
      dob: personalDetailsForm.value.dob,
      gender: personalDetailsForm.value.gender,
      email: personalDetailsForm.value.email,
      phone: personalDetailsForm.value.mobile,
      address: personalDetailsForm.value.address,
      marital_status: personalDetailsForm.value.maritalStatus,
      religion: personalDetailsForm.value.religion,
      caste: personalDetailsForm.value.caste,
      country: personalDetailsForm.value.country,
      city: personalDetailsForm.value.city,
      district: personalDetailsForm.value.district,
      state: personalDetailsForm.value.state,
      pincode: personalDetailsForm.value.pincode
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "**"
      })
    };

    const URL = `${environment.apiUrl}/personalDetails/`;

    this.http.post(URL, personalDetails, httpOptions).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.status === 201) {
          alert('Personal Details Added Successfully');
          personalDetailsForm.reset();
          this.router.navigate(['home/application/educational-details']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.submissionError = 'Failed to submit personal details. Please try again later.';
        console.error('Error occurred during form submission:', err);
      }
    });
  }
}
