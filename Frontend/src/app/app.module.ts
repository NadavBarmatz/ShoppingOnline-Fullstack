import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { NavbarComponent } from './components/layout-area/navbar/navbar.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { LogoComponent } from './components/shared-area/logo/logo.component';
import { NavLinksComponent } from './components/layout-area/navbar/nav-links/nav-links.component';
import { CategoriesComponent } from './components/home-area/categories/categories.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { BestSellersComponent } from './components/home-area/best-sellers/best-sellers.component';
import { DiscountComponent } from './components/home-area/discount/discount.component';
import { AboutUsComponent } from './components/home-area/about-us/about-us.component';
import { AllProductsComponent } from './components/shop-area/all-products/all-products.component';
import { ProductDetailComponent } from './components/shop-area/product-detail/product-detail.component';

import {HttpClientModule} from "@angular/common/http"
import {FormsModule} from "@angular/forms";
import { ProductCardComponent } from './components/shop-area/product-card/product-card.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LogoComponent,
    NavLinksComponent,
    CategoriesComponent,
    HomeComponent,
    BestSellersComponent,
    DiscountComponent,
    AboutUsComponent,
    AllProductsComponent,
    ProductDetailComponent,
    ProductCardComponent,
    AuthMenuComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
