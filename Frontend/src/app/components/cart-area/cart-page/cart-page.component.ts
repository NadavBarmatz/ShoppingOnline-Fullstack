import { CheckOutComponent } from './../../check-out-area/check-out/check-out.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openCheckoutDialog() {
    const dialogRef = this.dialog.open(CheckOutComponent)
  }

}
