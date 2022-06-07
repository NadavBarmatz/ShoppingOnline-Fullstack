import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdersState } from '../mobx/orders-state';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  private url = environment.urls.downloadReceipt;

  constructor(private http: HttpClient, private ordersState: OrdersState) { }

  public downloadReceipt(): any {
    return this.http.get(this.url + this.ordersState.getCurrentOrderId, { responseType: 'blob' });
  }
}
