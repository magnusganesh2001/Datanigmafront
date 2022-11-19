import { JobService } from './../core/services/job.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.scss'],
})

export class FindJobsComponent {
  displayedColumns: string[] = [
    'job'
  ];
  dataSource!: MatTableDataSource<JobList>;
  userId: string;
  searchText: string = '';
  jobInDisplay: JobList | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.jobInDisplay = undefined;
    this.userId = this.authService.getTokenData().id;
    this.jobService.getAllJobs().then((res) => {
      let jobList: any[] = res.data.jobs;
      jobList.forEach(job =>{
        if (job.candidates.includes(this.userId)) 
          job['applied'] = true;
        else
          job['applied'] = false;
      });
      this.dataSource = new MatTableDataSource<JobList>(jobList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter() {
    const filterString = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterString;
    this.jobInDisplay = undefined;
  }

  openJob(job: JobList) {
    this.jobInDisplay = job;
  }

  applyJob(jobId: any): void {
    this.jobService
      .applyJob(jobId)
      .then((res) => {
        this.toastService.success('Job has been applied successfully!', 'Job');
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.toastService.error(err.response.data.message, 'Job');
      });
  }
}

export interface JobList {
  skills: string[];
  languages: string[];
  benefits: string[];
  _id: string;
  title: string;
  description: string;
  salary: string;
  company: string;
  location: string;
  employer: string;
  candidates: string[];
  urgent: boolean;
  jobType: string;
  applied: boolean;
}
