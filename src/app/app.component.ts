import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'datanigma';
  showspinner!: boolean;
  authenticated: boolean;

  constructor(private router:Router, private authService: AuthService){
    this.authenticated = this.authService.isAuthenticated();
    this.authService.authorised.subscribe(authStatus => {
      this.authenticated = authStatus;
    })
  }
  ngOnInit(): void {
      this.showspinner = true;
      setTimeout(()=>{
        this.showspinner = false
      },1000)
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}
