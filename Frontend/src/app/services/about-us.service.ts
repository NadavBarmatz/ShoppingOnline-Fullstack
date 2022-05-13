import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  private slideIndicator = new BehaviorSubject(false);
  toSlide = this.slideIndicator.asObservable();

  constructor() { }

  public slideAction(bool: boolean) {
    this.slideIndicator.next(bool);
  }

}
