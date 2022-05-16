import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

const routes: Routes = [
  { path: "", component: OrdersListComponent },
];

@NgModule({
  declarations: [
    OrdersListComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule
  ]
})
export class OrdersModule { }
