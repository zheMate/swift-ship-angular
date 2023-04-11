import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {  startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { RussianCitiesService } from '../russian-cities.service';
import { RussianCities } from '../russian-cities';


@Component({
  selector: 'app-order-modal-add-and-edit',
  templateUrl: './order-modal-add-and-edit.component.html',
  styleUrls: ['./order-modal-add-and-edit.component.css'],
  providers: [RussianCitiesService]
})


export class OrderModalAddAndEditComponent implements OnInit {
  citiesControl = new FormControl();
  empForm: FormGroup;
  russianCities = [];
  filteredRussianCitiesOptions: Observable<any[]> = of([]);
  constructor(private russianCitiesService: RussianCitiesService,  private _fb: FormBuilder,){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
      postIndex: '',
      city: '',
      dateOfDelivery: '',
      shippingCompanies: '',
    });
    this.filteredRussianCitiesOptions = this.citiesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
  }
  
  ngOnInit() {}
  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.russianCitiesService.getDataFromApi()
     .pipe(
       map(response => response.filter((option:any) => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   } 
  
  minDate = new Date().toISOString();
  getPackageByaStranger: boolean = false;
  recipientName: string = '';
  recipientSurname: string = '';
  clientGender: string = '';
  genders: string[] = [
    'Мужской',
    'Женский',
    'Другой'
  ];
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
