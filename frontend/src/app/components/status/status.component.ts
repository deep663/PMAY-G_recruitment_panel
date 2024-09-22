import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  user_name: string = '';
  user_id: any = '';
  applicationId: string = '123456789';
  applicationStatus: string = '';
  remarks: string = 'Your application is currently being reviewed. Please check back later for updates.';
  http = inject(HttpClient);

  constructor() {}

  ngOnInit(): void {
    this.user_name = localStorage.getItem('userName') || '';
    this.user_id = localStorage.getItem('userId') || '';

    this.http.get(`${environment.apiUrl}/status/${this.user_id}`).subscribe((res: any) => {
      // console.log(res.status);
      this.applicationStatus = res.status;
      // this.remarks = res.remarks;
    })

    };

}
