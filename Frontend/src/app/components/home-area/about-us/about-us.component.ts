import { ProductsState } from 'src/app/mobx/products-state';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(public productsState: ProductsState, private scrollService: AboutUsService) { }

  @ViewChild('slideToSection') element: ElementRef;

  ngOnInit() {
    // service for scrolling to support getting to 'about us' section in homepage from anywhere on site:
      this.scrollService.toSlide.subscribe((data)=>{
        if(data) {
          this.element.nativeElement.scrollIntoView({behavior: 'smooth'});
          this.scrollService.slideAction(false);
        }
      });
  }

}
