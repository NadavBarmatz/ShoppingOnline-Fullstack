import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent implements OnInit {

  constructor() { }

  public isNavbarOpen: boolean = false;

  ngOnInit(): void {
  }

  public openNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

}
