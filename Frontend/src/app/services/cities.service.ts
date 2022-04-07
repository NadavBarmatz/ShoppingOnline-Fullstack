import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private urls = environment.urls;

  constructor(private http: HttpClient) { }

  public async getAllCities(): Promise<CityModel[]> {
    const cities = await firstValueFrom(this.http.get<CityModel[]>(this.urls.cities));
    return cities;
  }

}
