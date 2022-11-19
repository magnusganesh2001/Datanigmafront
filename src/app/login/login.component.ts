import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !:FormGroup;

  constructor( private FormBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.FormBuilder.group({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }
  login(){
    if (!this.loginForm.valid) {
      alert("Please enter your email and password...");
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email,password).then(res => {
      console.log(res);
      this.authService.setAuthenticated(res.data.token);
      this.router.navigate(['']);
    }).catch(err => {
      alert(err);
    })
  }

}
