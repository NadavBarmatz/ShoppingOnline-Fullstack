import { CitiesService } from './../../../services/cities.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartState } from 'src/app/mobx/cart-state';
import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';
import { AuthState } from 'src/app/mobx/auth-state';
import { OrderModel } from 'src/app/models/order.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CreditCardRegex } from 'src/app/models/regular-expressions';
import { min } from 'rxjs';
import { EmailModel } from 'src/app/models/email.model';
import { EmailsService } from 'src/app/services/emails.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  constructor(public cartState: CartState, private citiesService: CitiesService, 
    public authState: AuthState, private notifications: NotificationsService,
    private ordersService: OrdersService, public dialogRef: MatDialogRef<CheckOutComponent>,
    ) {  }
    
    public cities: CityModel[];
    public order = new OrderModel();
    public minDate: string;
    public creditCardRegex = CreditCardRegex;

    private receiptEmail = new EmailModel();
    
    async ngOnInit() {
      const now = new Date().toISOString();
      this.minDate = now.split("T")[0];
      this.order.deliveryDate = this.minDate;
      this.cities = await this.citiesService.getAllCities();
      this.order.cityId = this.authState.user.cityId;
      this.order.street = this.authState.user.street;
  }

  public async checkOut(): Promise<void> {
    try {
      // Creating the actual email:
      this.receiptEmail.subject = "SupermarCat - Receipt";
      let emailBody = ''
      this.cartState.getCartProducts.forEach(product=> emailBody += `${product.product.productName} X ${product.quantity} \n`);
      emailBody += 'total price - ' + this.cartState.getTotalPrice + "\n";
      emailBody += 'sent to ' + this.authState.user.street + " | " + this.authState.user.street + "\n";
      emailBody += 'Paid with credit card ends with ' + this.order.fourLastDigits;
      this.receiptEmail.body = emailBody;
      this.receiptEmail.to = this.authState.user.email;

      await this.ordersService.checkout(this.order, this.receiptEmail);
      this.notifications.success("Your order is being processed");
      this.dialogRef.close();
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
  

}
