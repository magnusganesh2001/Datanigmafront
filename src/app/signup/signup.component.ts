import { AuthService } from './../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !:FormGroup;
  userType: string;

  constructor(private formBuilder : FormBuilder, private authService: AuthService, private router: Router) {
    this.userType = 'Employer';
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: new FormControl(""),
      userCompany: new FormControl(""),
      userPhone: new FormControl(""),
      userEmail: new FormControl(""),
      userPassword: new FormControl("")
    })
  }

  signUp(){
    const user = {
      name: this.signupForm.get('userName')?.value,
      company: this.signupForm.get('userCompany')?.value,
      phone: this.signupForm.get('userPhone')?.value,
      email: this.signupForm.get('userEmail')?.value,
      password: this.signupForm.get('userPassword')?.value,
      type: this.userType,
    }
    this.authService.signup(user).then(res => {
      this.router.navigate(['login']);
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

  setSignup(type: string) {
    this.userType = type;
  }

}
