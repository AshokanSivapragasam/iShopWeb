import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { RegisterComponent } from './register/register.component';

const childRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/:productId', component: ProductDescriptionComponent}
];

const routes: Routes = [
  {path: '', component: HomeComponent, children: childRoutes},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
