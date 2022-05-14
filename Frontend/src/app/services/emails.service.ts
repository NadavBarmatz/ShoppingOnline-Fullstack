import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailModel } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  private emailUrl = environment.urls.emails; 

  constructor(private http: HttpClient) { }

  async sendMail(email: EmailModel) {
    await firstValueFrom(this.http.post(this.emailUrl, email));
  }

}
