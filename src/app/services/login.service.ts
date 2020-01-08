import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiRootUri: string = 'https://localhost:44362/api/login';
  
  constructor(private httpClient: HttpClient) { }

  sendOtp(phoneNumber: string): Observable<boolean>{
    return this.httpClient.post<boolean>(this.apiRootUri + '/sendotp', { PhoneNumber: phoneNumber}, httpOptions);
  }

  challengeIdentityUsingOtp(phoneNumber: string, otp: string): Observable<boolean>{
    return this.httpClient.post<boolean>(this.apiRootUri + '/loginwithotp', { PhoneNumber: phoneNumber, Otp: otp }, httpOptions);
  }
}
