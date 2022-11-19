import { HeaderComponent } from './header/header.component';
import { ModalResumeComponent } from './modal-resume/modal-resume.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { AppliedCandidatesComponent } from './applied-candidates/applied-candidates.component';
import { AppComponent } from './app.component';
import { JobPostComponent } from './job-post/job-post.component';
import { EmployerComponent } from './employer/employer.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerGuard } from './core/guards/employer.guard';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "signup", component:SignupComponent},
  {path: "employer", component:EmployerComponent, canActivate: [AuthGuard, EmployerGuard]},
  {path: "job-post", component: JobPostComponent, canActivate: [AuthGuard, EmployerGuard]},
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "find-job", component: FindJobsComponent, canActivate: [AuthGuard]},
  {path: "applied-candidates", component: AppliedCandidatesComponent, canActivate: [AuthGuard]},
  {path: "applied-jobs", component: AppliedJobsComponent, canActivate: [AuthGuard]},
  {path: "candidate-profile", component: CandidateProfileComponent, canActivate: [AuthGuard]},
  {path: "modalResume", component: ModalResumeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}