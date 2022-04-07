import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  public discountPercentage: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
