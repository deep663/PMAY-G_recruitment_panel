import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit{
  currentStep = 1;
  applicationSubmitted = false;

  constructor( private router: Router) {
  }

  ngOnInit(): void {
    this.applicationSubmitted = localStorage.getItem('applicationSubmitted') === '1';
    this.currentStep = parseInt(localStorage.getItem('currentStep') || '1');
    this.updateRoute(this.currentStep);
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.updateCurrentStep(event.urlAfterRedirects);
      }
    });

  }

  updateCurrentStep(url: string): void {
    if (url.includes('personal-details')) {
      this.currentStep = 1;
      localStorage.setItem('currentStep', '1');
    } else if (url.includes('educational-details')) {
      this.currentStep = 2;
      localStorage.setItem('currentStep', '2');
    } else if (url.includes('work-experience')) {
      this.currentStep = 3;
      localStorage.setItem('currentStep', '3');
    } else if (url.includes('upload-documents')) {
      this.currentStep = 4;
      localStorage.setItem('currentStep', '4');
    } else if (url.includes('review-submit')) {
      this.currentStep = 5;
      localStorage.setItem('currentStep', '5');
    }
  }

  updateRoute(step: number) {
    switch (step) {
      case 1:
        this.router.navigate(['home/application/personal-details']);
        break;
      case 2:
        this.router.navigate(['home/application/educational-details']);
        break;
      case 3:
        this.router.navigate(['home/application/work-experience']);
        break;
      case 4:
        this.router.navigate(['home/application/upload-documents']);
        break;
      case 5:
        this.router.navigate(['home/application/review-submit']);
        break;
    }
  }
}
