import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ApplicationComponent } from './pages/application/application.component';
import { LandingComponent } from './components/landing/landing.component';
import { StatusComponent } from './components/status/status.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { EducationalDetailsComponent } from './components/educational-details/educational-details.component';
import { authGuard } from './guard/auth.guard';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SelectPostComponent } from './components/select-post/select-post.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', redirectTo: 'landing', pathMatch: 'full' },
            { path: 'landing', component: LandingComponent },
            {
                path: 'application', component: ApplicationComponent, children: [
                    { path: '', redirectTo: 'personal-details', pathMatch: 'full' },
                    { path: 'personal-details', component: PersonalDetailsComponent },
                    { path: 'educational-details', component: EducationalDetailsComponent },
                    { path: 'work-experience', component: WorkExperienceComponent },
                    { path: 'upload-documents', component: UploadDocumentsComponent },
                    { path: 'review-submit', component: ReviewSubmitComponent },
                ], canActivate: [authGuard]
            },
            { path: 'select-post', component: SelectPostComponent },
            { path: 'status', component: StatusComponent, canActivate: [authGuard] },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: 'home' }

];
