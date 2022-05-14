import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  public isSizeSmaller670(): boolean {
    return window.innerWidth < 670;
  }

  public isSizeSmaller1400(): boolean {
    return window.innerWidth < 1400;
  }

}
