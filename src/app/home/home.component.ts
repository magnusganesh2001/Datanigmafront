import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userid!: string;
  userType: String;
  candidateResume: any

  constructor(private router:Router, private authService: AuthService){
    this.userType = authService.getTokenData().type;
  }

  ngOnInit(): void {
    this.userid = this.router.url.split('/')[this.router.url.split('/').length-1];
    this.authService.getCandidateProfile(this.userid).then(res => {
    this.candidateResume = res.data.user.resume ? res.data.user.resume : "Not uploaded";
    });
    if (this.candidateResume == "Not uploaded"){
      alert("Please Update the Resume for Seamless Searching")
    }
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
