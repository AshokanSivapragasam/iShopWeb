import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { LoginService } from './services/login.service';
import { AzSignalRService } from './services/azsignalr.service';
import { MessengerService } from './services/messenger.service';
import { ProductService } from './services/product.service';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    ProductDescriptionComponent,
    ProductsByCategoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MsAdalAngular6Module.forRoot({
      tenant: 'happiestminds.onmicrosoft.com',
      clientId: '94b0d72e-acda-4fb5-b7b9-5f9d5a4c6bf3',
      redirectUri: window.location.origin,
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService, AzSignalRService, MessengerService, ProductService, CartService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
