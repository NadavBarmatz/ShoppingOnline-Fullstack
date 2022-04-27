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

  private urls = {
    register: environment.urls.register,
    login: environment.urls.login
  };

  constructor(private http: HttpClient, private authState: AuthState) { }

  // Register
  public async register(user: UserModel): Promise<string> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.register, user));
    this.authState.register(token);
    return token;
  }
  
  // Login
  public async login(credentials: CredentialsModel): Promise<string> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.login, credentials));
    this.authState.register(token);
    return token;
  }

  // Logout
  public logout(): void {
    this.authState.logout();
  }

}
