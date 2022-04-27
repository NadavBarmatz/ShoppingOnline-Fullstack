import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  @Input()
  public openMenu: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
