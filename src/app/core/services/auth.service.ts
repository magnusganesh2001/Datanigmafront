import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JsonpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = "https://careerskartapiprod.azurewebsites.net/"
  private authenticated = false;

  authorised: Subject<boolean> = new Subject<boolean>();
  
  private axiosClient: AxiosInstance;
  constructor(private router: Router) {
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      baseURL: this.BASE_URL
    });
    if (localStorage.getItem('token') !== null) {
      this.authenticated = true;
      this.authorised.next(this.authenticated);
    }
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public setAuthenticated(data : any): void {
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('userData', JSON.stringify(data.userData));

    this.authenticated = true;
    this.authorised.next(this.authenticated);
  }

  public getUserData(){
    let userData : any
    userData =  JSON.parse(localStorage.getItem('userData')!)
    return userData
  }

  public decoded(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public logout(): void {
    this.authenticated = false;
    this.authorised.next(this.authenticated);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public getTokenData() {
    return JSON.parse(localStorage.getItem('userData')!);
  }

  public getToken() {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public signup(user: any) {
    return this.axiosClient.request({
      method: "post",
      url: 'api/user/signup',
      data: user
    });
  }

  public login(email: string, password: string) {
    return this.axiosClient.request({
      method: "post",
      url: 'api/user/login',
      data: {
        email, password
      }
    });
  }
  
  getCandidateProfile(userid: string) {
    return this.axiosClient.request({
      method: 'get',
      url: 'api/user/candidate/'+userid
    });
  }
}
