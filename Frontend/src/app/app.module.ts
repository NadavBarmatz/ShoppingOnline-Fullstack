import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { NavbarComponent } from './components/layout-area/navbar/navbar.component';
import { NavLinksComponent } from './components/layout-area/navbar/nav-links/nav-links.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { CategoriesFilterComponent } from './components/shared-area/categories-filter/categories-filter.component';
import { BestSellersComponent } from './components/home-area/best-sellers/best-sellers.component';
import { DiscountComponent } from './components/home-area/discount/discount.component';
import { AboutUsComponent } from './components/home-area/about-us/about-us.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductModalComponent } from './components/products-area/product-modal/product-modal.component';
import { MyCartComponent } from './components/cart-area/my-cart/my-cart.component';
import { MobxAngularModule } from "mobx-angular";
import { AddProductComponent } from './components/products-area/add-product/add-product.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    NavLinksComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AuthMenuComponent,
    HomeComponent,
    CategoriesFilterComponent,
    BestSellersComponent,
    DiscountComponent,
    AboutUsComponent,
    ProductsListComponent,
    ProductCardComponent,
    ProductModalComponent,
    MyCartComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }