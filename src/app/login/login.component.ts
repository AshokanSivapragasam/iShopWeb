import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { AzSignalRService } from '../azsignalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private azSignalRService: AzSignalRService) {
    this.loginForm = formBuilder.group({
      phoneNumber: ['12345', Validators.required],
      otp: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.azSignalRService.init();
    if (localStorage.getItem('user-identity')) {
      this.router.navigate(['/products']);
    }

    this.azSignalRService.messages
    .subscribe(_newOtp_ => {
      console.log(_newOtp_);
      this.loginForm.setValue({phoneNumber: this.loginForm.value.phoneNumber, otp: _newOtp_});
    });
  }

  guestLogin() {
    this.router.navigate(['/products']);
  }

  getOtp() {
    const _phoneNumber = this.loginForm.value.phoneNumber;
    this.loginService.getOtp(_phoneNumber)
    .subscribe(_result_ => {
      console.log(_result_);
    });
  }

  mobileLoginUsingOtp() {
    const _phoneNumber = this.loginForm.value.phoneNumber;
    const _otp = this.loginForm.value.otp;
    this.loginService.challengeIdentityUsingOtp(_phoneNumber, _otp)
    .subscribe(isValidUser => {
      if (isValidUser) {
        localStorage.setItem('user-identity', JSON.stringify({ phoneNumber: _phoneNumber, otp: _otp, isIdentityProved: isValidUser }));
        this.router.navigate(['/products']);
      } else {
        localStorage.removeItem('user-identity');
        this.router.navigate(['/login']);
      }
    });
  }
}
