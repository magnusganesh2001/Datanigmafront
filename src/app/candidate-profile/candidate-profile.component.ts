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
    this.candidateName = this.authService.getUserData().name
    this.candidateMail = this.authService.getUserData().email
    this.candidateNo = this.authService.getUserData().phone
    this.candidateLocation = this.authService.getUserData().location ? this.authService.getUserData().location : "Not provided";
    this.candidateResume = this.authService.getUserData().resume ? this.authService.getUserData().resume : "Not uploaded";

  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalResumeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

}
