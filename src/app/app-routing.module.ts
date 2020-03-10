import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet, RouterState } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { CartComponent } from './components/cart/cart.component';

const childRoutes: Routes = [
  {path: 'carts/:cartId', component: CartComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productsbycategory', component: ProductsByCategoryComponent},
  {path: 'products/:productId', component: ProductDescriptionComponent}
];

export const routes: Routes = [
  {path: '', component: HomeComponent, children: childRoutes, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
