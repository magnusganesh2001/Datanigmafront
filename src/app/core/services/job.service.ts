import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private BASE_URL = "https://careerskartapiprod.azurewebsites.net/"
  private axiosClient: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      baseURL: this.BASE_URL
    });
  }

  createJob(job: any) {
    return this.axiosClient.request({
      method: 'post',
      url: 'api/job',
      data: job
    });
  }

  getAllJobs() {
    return this.axiosClient.request({
      method: 'get',
      url: 'api/job/all'
    });
  }

  getCreatedJobs() {
    const userId = this.authService.getTokenData().id;
    return this.axiosClient.request({
      method: 'post',
      url: 'api/job/employer',
      data: {
        id: userId
      }
    });
  }

  applyJob(jobId: any) {
    const userData = this.authService.getTokenData();
    return this.axiosClient.request({
      method: 'post',
      url: 'api/job/apply',
      data: {
        candidateId: userData.id,
        jobId
      }
    });
  }

  getCandidates() {
    return this.axiosClient.request({
      method: 'get',
      url: 'api/job/candidates'
    });
  }
}
