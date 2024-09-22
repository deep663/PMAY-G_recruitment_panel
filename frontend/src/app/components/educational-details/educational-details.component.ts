import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-educational-details',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './educational-details.component.html',
  styleUrl: './educational-details.component.css'
})
export class EducationalDetailsComponent {
  http = inject(HttpClient);
  URL = `${environment.apiUrl}/qualifications/`;

  constructor(private router: Router) { }

  // Array to hold multiple educational details
  educationArray: any[] = [
    { qualification: '', institute: '', board: '', passingYear: '', marks: '' },
  ];

  // Method to add a new education entry
  addEducation() {
    this.educationArray.push({
      examination_name: '',
      board: '',
      institute_name: '',
      passing_year: '',
      result: '',
    });
  }

  // Method to remove an education entry by index
  removeEducation(index: number) {
    this.educationArray.splice(index, 1);
  }

  // Method to handle form submission
  onSubmit(form: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "**"
      })
    }

    const body = {
      user_id: localStorage.getItem('userId'),
      examinations: this.educationArray
    }

    this.http.post(this.URL, body, httpOptions).subscribe((res: any) => {
      if (res.status === 201) {
        alert('Successfully Registered!');
        this.router.navigate(['/home/application/work-experience']);
      }
    }, (err) => {
      console.log(err);
      alert('Something went wrong!');
    })
  }
}
