import { JobService } from '../core/services/job.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  jobs: any;
  userId: string;

  constructor(private authService: AuthService, private jobService: JobService, private router: Router, private toastService: ToastrService) {
    this.jobService.getAllJobs().then(res => {
      this.jobs = res.data.jobs;
    });
    this.jobService.getCandidates().then(res => {
      console.log(res);
    });
    this.userId = this.authService.getTokenData().id;
  }

  ngOnInit(): void {
  }

}
