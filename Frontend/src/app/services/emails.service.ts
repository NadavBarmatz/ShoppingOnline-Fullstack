import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../mobx/auth-state';
import { CartState } from '../mobx/cart-state';
import { EmailModel } from '../models/email.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  private emailUrl = environment.urls.emails; 

  
  constructor(private http: HttpClient, private cartState: CartState, private authState: AuthState) { }
  
  public async createReceiptEmail(order: OrderModel) {
    const email = new EmailModel();
    // Creating the actual email:
    email.subject = "SupermarCat - Receipt";
    let emailBody = ''
    this.cartState.getCartProducts.forEach(product=> emailBody += `${product.product.productName} X ${product.quantity} \n`);
    emailBody += 'total price - ' + this.cartState.getTotalPrice.toFixed(2) + "\n";
    emailBody += 'sent to ' + this.authState.user?.street + " | " + this.authState.user.city?.name + "\n";
    emailBody += 'Paid with credit card ends with ' + order.fourLastDigits;
    email.body = emailBody;
    email.to = this.authState.user.email;
    // send the email:
    await this.sendMail(email);
  }
  
  public async createDiscountEmail(emailRecipient: string) {
    const email = new EmailModel();
    email.to = emailRecipient;
    email.subject = "SupermarCat - Discount Mail";
    email.body = "Thank you for taking your time to check the discount feature";
    // send the email:
    await this.sendMail(email);
  }

  private async sendMail(email: EmailModel) {
      await firstValueFrom(this.http.post(this.emailUrl, email, {responseType: 'text'}));
  }

}
