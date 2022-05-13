import { Component } from '@angular/core';
import { EmailModel } from 'src/app/models/email.model';
import { EmailRegex } from 'src/app/models/regular-expressions';
import { EmailsService } from 'src/app/services/emails.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {

  public discountPercentage: number = 10;
  public discountEmail = new EmailModel();
  public emailRegex = EmailRegex;

  constructor(private emailsServices: EmailsService, private notifications: NotificationsService) { }

  public async sendDiscount() {
    try{
      this.emailsServices.sendDiscountMail(this.discountEmail)
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
}
