import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userType: String;

  constructor(private router:Router, private authService: AuthService){
    this.userType = authService.getTokenData().type;
  }

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
