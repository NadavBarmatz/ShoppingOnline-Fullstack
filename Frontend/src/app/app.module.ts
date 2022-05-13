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
import { CategoriesFilterComponent } from './components/categories-area/categories-filter/categories-filter.component';
import { BestSellersComponent } from './components/home-area/best-sellers/best-sellers.component';
import { DiscountComponent } from './components/home-area/discount/discount.component';
import { AboutUsComponent } from './components/home-area/about-us/about-us.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModalComponent } from './components/products-area/product-modal/product-modal.component';
import { MyCartComponent } from './components/cart-area/my-cart/my-cart.component';
import { MobxAngularModule } from "mobx-angular";
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { AddCategoryComponent } from './components/admin-area/add-category/add-category.component';
import { AdminMenuComponent } from './components/admin-area/admin-menu/admin-menu.component';
import { CartPageComponent } from './components/cart-area/cart-page/cart-page.component';
import { CheckRouteRenderFilterSysDirective } from './directives/check-route-render-filter-sys.directive';
import { EditProductComponent } from './components/admin-area/edit-product/edit-product.component';
import { CheckOutComponent } from './components/check-out-area/check-out/check-out.component';
import { ValidationErrorHandlerComponent } from './components/shared-area/validation-error-handler/validation-error-handler.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TestDirective } from './test.directive';

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
    AddCategoryComponent,
    AdminMenuComponent,
    CartPageComponent,
    CheckRouteRenderFilterSysDirective,
    EditProductComponent,
    CheckOutComponent,
    ValidationErrorHandlerComponent,
    TestDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MobxAngularModule,
    
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatFileInputModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
