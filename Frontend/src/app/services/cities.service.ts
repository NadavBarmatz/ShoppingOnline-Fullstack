import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private cityUrl = environment.urls.cities

  constructor(private http: HttpClient) { }

  public async getAllCities(): Promise<CityModel[]> {
    const cities = await firstValueFrom(this.http.get<CityModel[]>(this.cityUrl));
    return cities;
  }

  public async addCity(city: CityModel): Promise<CityModel> {
    const addedCity = await firstValueFrom(this.http.post<CityModel>(this.cityUrl, city));
    return addedCity;
  } 

}
