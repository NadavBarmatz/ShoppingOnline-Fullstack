import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {

  @Input()
  public categories: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
