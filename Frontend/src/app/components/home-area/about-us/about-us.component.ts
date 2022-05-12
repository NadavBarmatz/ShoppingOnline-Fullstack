import { ProductsState } from 'src/app/mobx/products-state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(public productsState: ProductsState) { }

  ngOnInit(): void {
  }

}
