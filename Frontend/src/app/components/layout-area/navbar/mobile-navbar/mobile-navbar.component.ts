import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent {

  public isNavbarOpen: boolean = false;

  public openNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

}
