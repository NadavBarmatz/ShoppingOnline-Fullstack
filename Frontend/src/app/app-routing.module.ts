import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { AddCategoryComponent } from './components/admin-area/add-category/add-category.component';
import { CartPageComponent } from './components/cart-area/cart-page/cart-page.component';
import { EditProductComponent } from './components/admin-area/edit-product/edit-product.component';
import { CheckOutComponent } from "./components/check-out-area/check-out/check-out.component";

const routes: Routes = [

  // Auth routes:
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},

  // Admin routes:
  {path: "add-product", canActivate: [AdminGuard], component: AddProductComponent},
  {path: "edit-product/:productId", canActivate: [AdminGuard], component: EditProductComponent},
  {path: "add-category", canActivate: [AdminGuard], component: AddCategoryComponent},

  // Site routes:
  { path: "home", component: HomeComponent},
  { path: "shop/all-products", canActivate: [UserGuard], component: ProductsListComponent },
  { path: "shop/all products", canActivate: [UserGuard], component: ProductsListComponent },
  { path: "shop/:keyWord", canActivate: [UserGuard], component: ProductsListComponent},
  { path: "my-cart", canActivate: [UserGuard], component: CartPageComponent },
  { path: "check-out", canActivate: [UserGuard], component: CheckOutComponent },

  // Fallbacks routes:
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", pathMatch: "full", redirectTo: "home" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
