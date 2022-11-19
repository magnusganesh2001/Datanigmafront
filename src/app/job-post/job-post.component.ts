import { JobService } from './../core/services/job.service';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})

export class JobPostComponent implements OnInit {

  public jobPostForm !:FormGroup;

  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobPostForm = this.FormBuilder.group({
      jobTitle: new FormControl(''),
      jobDescription: new FormControl(''),
      salary: new FormControl(''),
      location: new FormControl(''),
      jobType: new FormControl(''),
      skills: new FormControl(''),
      languages: new FormControl(''),
      benefits: new FormControl(''),
      urgent: new FormControl('')
    })
  }

  createJob() {
    if (!this.jobPostForm.valid) {
      alert("Fill necessary details");
      return;
    }
    const userData = this.authService.getTokenData();
    const job = {
      title: this.jobPostForm.get('jobTitle')?.value,
      description: this.jobPostForm.get('jobDescription')?.value,
      salary: this.jobPostForm.get('salary')?.value,
      company: userData.company,
      location: this.jobPostForm.get('location')?.value,
      employer: userData.id,
      jobType: this.jobPostForm.get('jobType')?.value,
      skills: this.jobPostForm.get('skills')?.value.trim().split(","),
      languages: this.jobPostForm.get('languages')?.value.trim().split(","),
      benefits: this.jobPostForm.get('benefits')?.value.trim().split(","),
      urgent: Boolean( this.jobPostForm.get('urgent')?.value)
      
    }

    this.jobService.createJob(job).then(res => {
      console.log(job);
      this.router.navigate(['employer']);
    }).catch(err => {
      console.log(err);
      alert(err);
    });

  }

}
