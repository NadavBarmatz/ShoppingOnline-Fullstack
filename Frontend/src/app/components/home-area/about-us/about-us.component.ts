import { ProductsState } from 'src/app/mobx/products-state';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(public productsState: ProductsState) { }

  @ViewChild('slideToSection') element: ElementRef;

}
