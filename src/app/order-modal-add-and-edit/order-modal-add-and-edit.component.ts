import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-order-modal-add-and-edit',
  templateUrl: './order-modal-add-and-edit.component.html',
  styleUrls: ['./order-modal-add-and-edit.component.css'],
  
})


export class OrderModalAddAndEditComponent {
  minDate = new Date().toISOString();
  getPackageByaStranger = false;
  recipientName = '';
  recipientSurname = '';
  onCheckboxChange() {
    if (!this.getPackageByaStranger) {
      this.recipientName = '';
      this.recipientSurname = '';
    }
  }
  shippingCompanies: string[] = [
    'Boxberry',
    'DHL',
    'Pony Express',
    'Бандеролька',
    'СДЭК'
  ];
}
