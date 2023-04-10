import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalAddAndEditComponent } from './order-modal-add-and-edit/order-modal-add-and-edit.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  
})
export class AppComponent  {
  title = 'SwiftShip';
  
  constructor(private _dialog: MatDialog ) {}
  
  openAddEditOrderModalForm(){
    this._dialog.open(OrderModalAddAndEditComponent);
  }
}
