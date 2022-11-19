import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalResumeComponent } from '../modal-resume/modal-resume.component'
import { Router } from '@angular/router';
import { JobService } from '../core/services/job.service';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})


export class CandidateProfileComponent implements OnInit {
  loggedIn: boolean;
  userid!: string;
  candidateName: string = "";
  candidateMail: string = "";
  candidateNo:string = "";
  candidateLocation: string = "";
  candidateResume: string = "";

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) {
    this.loggedIn = authService.isAuthenticated()
  }
  
  ngOnInit(): void {
    this.userid = this.router.url.split('/')[this.router.url.split('/').length-1];
    console.log(this.userid);
    this.authService.getCandidateProfile(this.userid).then(res => {
      console.log(res);
      this.candidateName = res.data.user.name;
      this.candidateMail = res.data.user.email;
      this.candidateNo = res.data.user.phone;
      this.candidateLocation = res.data.user.location ? res.data.user.location : "Not provided";
      this.candidateResume = res.data.user.resume ? res.data.user.resume : "Not uploaded";
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalResumeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

}
