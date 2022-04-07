import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { AllProductsComponent } from './components/shop-area/all-products/all-products.component';

const routes: Routes = [
  // Auth routes:
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},

  // Site routes:
  { path: "home", component: HomeComponent },
  { path: "shop/all-products", component: AllProductsComponent },

  // Fallbacks routes:
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
