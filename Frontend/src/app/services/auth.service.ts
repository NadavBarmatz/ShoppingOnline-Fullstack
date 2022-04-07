import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../mobx/auth-state';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urls = environment.urls;

  constructor(private http: HttpClient, private authState: AuthState) { }

  public async register(user: UserModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.register, user));
    this.authState.register(token);
  } 

  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.login, credentials));
    this.authState.login(token);
  }

  public logout(): void {
    this.authState.logout();
  }

}
