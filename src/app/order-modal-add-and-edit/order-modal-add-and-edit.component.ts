import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { RussianCitiesService } from '../russian-cities.service';
import { RussianCities } from '../russian-cities';
import { OrderService } from '../services/order.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ValidationService } from '../core/validation.service';


@Component({
  selector: 'app-order-modal-add-and-edit',
  templateUrl: './order-modal-add-and-edit.component.html',
  styleUrls: ['./order-modal-add-and-edit.component.css'],
  providers: [RussianCitiesService]
})


export class OrderModalAddAndEditComponent implements OnInit {

  modalFormForOrder: FormGroup;

  russianCities = [];

  filteredRussianCitiesOptions = [];

  constructor(
    private russianCitiesService: RussianCitiesService,
    private _fb: FormBuilder,
    private _orderService: OrderService,
    private _dialogRef: MatDialogRef<OrderModalAddAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _validationService: ValidationService,
    
  ) { }
  ngOnInit() {
    this.initForm();
    this.getNamesOfRussianCitiesAndDistricts();
    this.modalFormForOrder.patchValue(this.data);
  }
  initForm() {
    this.modalFormForOrder = this._fb.group({
      firstName: new FormControl('', [Validators.required, this._validationService.noSpaceAllowed, Validators.pattern('[а-яА-Я]*'), Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, this._validationService.noSpaceAllowed, Validators.pattern('[а-яА-Я]*'),  Validators.minLength(2)]),
      gender: new FormControl('Мужской', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      recieveAddress: new FormControl('', [Validators.required, Validators.pattern('[а-яА-Я0-9. ]*'), Validators.minLength(6),] ),
      postIndex: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]*')]),
      citiesAndDistrictFilter: new FormControl('', [Validators.required, Validators.pattern('[а-яА-Я- ]*')]),
      departureDate: new FormControl('', Validators.required),
      shippingCompanies: new FormControl('Boxberry', Validators.required),
    })
    this.modalFormForOrder.get('citiesAndDistrictFilter').valueChanges.subscribe(response => {
      this.filterCitiesAndDistricts(response);
    })
  }
  filterCitiesAndDistricts(enteredData) {
    this.filteredRussianCitiesOptions = this.russianCities.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  onFormSubmit() {
    if (this.modalFormForOrder.valid) {
      if (this.data) {
        this._orderService.updateOrder(this.data.id, this.modalFormForOrder.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Детали заказа изменены !');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      else {
        this._orderService.addOrder(this.modalFormForOrder.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Заказ успешно добавлен !');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }
  getNamesOfRussianCitiesAndDistricts() {
    this.russianCitiesService.getDataFromApi().subscribe(response => {
      this.russianCities = response;
      this.filteredRussianCitiesOptions = response;
    })
  }

  
  minDate = new Date().toISOString();



  genders: string[] = [
    'Мужской',
    'Женский',
    'Другой'
  ];

  shippingCompanies: string[] = [
    'Boxberry',
    'DHL',
    'Pony Express',
    'Бандеролька',
    'СДЭК'
  ];
}
