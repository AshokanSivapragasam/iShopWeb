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

  getOtp(phoneNumber: string): Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiRootUri + '/getotp/' + phoneNumber);
  }

  challengeIdentityUsingOtp(phoneNumber: string, otp: string): Observable<boolean>{
    return this.httpClient.post<boolean>(this.apiRootUri + '/usingotp', { PhoneNumber: phoneNumber, Otp: otp }, httpOptions);
  }
}
