import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailModel } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  private urls = {
    discountMail: environment.urls.emails + "discount", 
  }

  constructor(private http: HttpClient) { }

  async sendDiscountMail(email: EmailModel) {
    email.subject = "SupermarCat - Discount Mail";
    email.body = "Thank you for taking your time to check the discount feature";
    await firstValueFrom(this.http.post(this.urls.discountMail, email));
  }
}
