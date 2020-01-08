import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { AzSignalRService } from '../../services/azsignalr.service';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { ProductsComponent } from '../products/products.component';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let loginService: LoginService;
  let azSignalRService: AzSignalRService;
  let router: Router;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AzSignalRService, LoginService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.get(FormBuilder);
    loginService = TestBed.get(LoginService);
    azSignalRService = TestBed.get(AzSignalRService);
    router = TestBed.get(Router);
    httpClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.loginForm.value.phoneNumber).toEqual("12345");
  });

  it('should init', () => {
    // Arrange
    spyOn(azSignalRService, 'init').and.callThrough();

    // Act
    component.ngOnInit();

    // Assert
    expect(azSignalRService).toBeDefined();
  });

  it('should login mobile using Otp', () => {
    // Arrange
    
    // Act

    // Assert
  });
});
