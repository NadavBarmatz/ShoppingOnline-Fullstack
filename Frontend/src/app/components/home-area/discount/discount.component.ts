import { Component } from '@angular/core';
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
  public discountEmailRecipient: string;
  public emailRegex = EmailRegex;

  constructor(private emailsServices: EmailsService, private notifications: NotificationsService) { }

  public async sendDiscount() {
    try{
      await this.emailsServices.createDiscountEmail(this.discountEmailRecipient);
      this.notifications.success("an email has ACTUALLY been sent to your ACTUAL email")
    }
    catch(err: any) {
      this.notifications.error(err);
    }
  }
}
