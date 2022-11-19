import { JobService } from './../core/services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  displayedColumns: string[] = ['title', 'company', 'description', 'salary'];
  dataSource = [];
  constructor(private jobService: JobService) {
    this.jobService.getCreatedJobs().then(res => {
      console.log(res.data);

      this.dataSource = res.data.jobs;
    });
  }

  ngOnInit(): void {
  }

}
