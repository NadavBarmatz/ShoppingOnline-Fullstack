import { Component, OnInit,  ViewChild, ElementRef, AfterViewChecked, AfterViewInit, AfterContentChecked, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsState } from 'src/app/mobx/products-state';
import { ProductModel } from 'src/app/models/product.model';
import { CartsService } from 'src/app/services/carts.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductsService } from 'src/app/services/products.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, AfterViewInit {

  @ViewChild('slideToMain') element: ElementRef;
  ngAfterViewInit(){
    // this.element.nativeElement.scrollIntoView({behavior: 'smooth'});
    // console.log(this.main)
  }

  public products: ProductModel[];
  private filterKeyWord: string;
  public isCartShown: boolean = false;

  constructor(public screenSize: ScreenSizeService,private productsState: ProductsState, private productsService: ProductsService, 
    private notifications: NotificationsService, private cartsService: CartsService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    try{
      // Get user cart from DB. if not exist, create one:
      await this.cartsService.validateCartExistenceAndCreateIfNoExist();
      if(!this.productsState.isProductsInMobx) {
        // get products from db:
        this.products = await this.productsService.getAllProducts();
      }
      else {
        // get products from mobx:
        this.products = this.productsState.products;
      }
      // Subscribe to route params for filtering products:
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.filterKeyWord = params.get("keyWord");
        if(this.filterKeyWord != null) {
          this.products = this.productsService.filterProducts(this.filterKeyWord)
        }
      })      
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }

  public cartClicked() {
    this.isCartShown = !this.isCartShown;
  }

  
  @ViewChild('cartTab') cartTab: ElementRef ;
  public forceHover() {
    this.cartTab.nativeElement.classList.add("hover-tab");
    setTimeout(()=>{
      this.cartTab.nativeElement.classList.remove("hover-tab");
    }, 300)
  }

}
