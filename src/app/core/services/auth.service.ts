import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = "http://localhost:3000/api/user/"
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

  public setAuthenticated(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
    this.authenticated = true;
    this.authorised.next(this.authenticated);
  }

  public logout(): void {
    this.authenticated = false;
    this.authorised.next(this.authenticated);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getTokenData() {
    return this.getDecodedAccessToken(localStorage.getItem('token')!);
  }

  public getToken() {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public signup(user: any) {
    return this.axiosClient.request({
      method: "post",
      url: 'signup',
      data: user
    });
  }

  public login(email: string, password: string) {
    return this.axiosClient.request({
      method: "post",
      url: 'login',
      data: {
        email, password
      }
    });
  }

}
