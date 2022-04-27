import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { MyCartComponent } from './components/cart-area/my-cart/my-cart.component';

const routes: Routes = [

  // Auth routes:
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},

  // // Admin routes:
  {path: "add-product", component: AddProductComponent},

  // // Site routes:
  { path: "home", component: HomeComponent },
  { path: "shop/all-products", component: ProductsListComponent },
  { path: "shop/:keyWord", component: ProductsListComponent},
  { path: "my-cart", component: MyCartComponent },

  // Fallbacks routes:
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", pathMatch: "full", redirectTo: "home" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
