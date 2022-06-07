import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent {

  @Input()
  public categories: string[];

  constructor(private router: Router) { }


  redirect(str: string){
    this.router.navigateByUrl("shop/" + str)
  }

}
