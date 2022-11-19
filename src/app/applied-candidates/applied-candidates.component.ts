import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { JobService } from '../core/services/job.service';

@Component({
  selector: 'app-applied-candidates',
  templateUrl: './applied-candidates.component.html',
  styleUrls: ['./applied-candidates.component.scss']
})
export class AppliedCandidatesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'resume'];
  dataSource: { name: any; phone: any; email: any; resume: any; id: any }[] = [];

  constructor(private jobService: JobService, private authService: AuthService) { }

  ngOnInit(): void {
    let user = this.authService.getTokenData();
    console.log(user);
    this.jobService.getCandidates().then(res => {
      console.log(res.data);
      
      res.data.candidates.forEach((e: { name: any; phone: any; email: any; resume: any; id: any }) => {
        this.dataSource.push({
          'name': e.name,
          'phone': e.phone,
          'email': e.email,
          'resume': e.resume,
          'id': e.id
        });
      });
      console.log(this.dataSource);
      
    });
  }

}
