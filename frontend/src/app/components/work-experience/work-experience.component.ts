import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {

  http = inject(HttpClient);



  workExperienceArray: Array<any> = [
    {
      company_name: '',
      position: '',
      from: '',
      to: '',
      location: ''
    }
  ];

  constructor(private router: Router) { }

  // Function to handle form submission
  onSubmit(form: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "**"
      })
    };

    const body = {
      user_id: localStorage.getItem('userId'),
      work_experiences: this.workExperienceArray
    };

    const URL = `${environment.apiUrl}/workExperience`;

    this.http.post(URL, body, httpOptions).subscribe((res: any) => {
      if (res.status === 201) {
        alert('Work Experience added successfully!');
        this.router.navigate(['/home/application/upload-documents']);
      }
    }, (err) => {
      console.log(err);
      alert('Something went wrong!');
    });
  }

  // Function to add a new work experience entry
  addWorkExperience() {
    this.workExperienceArray.push({
      company_name: '',
      position: '',
      from: '', to: '',
      location: ''
    });
  }

  // Function to remove a work experience entry
  removeWorkExperience(index: number) {
    if (this.workExperienceArray.length > 1) {
      this.workExperienceArray.splice(index, 1);
    }
  }
}
