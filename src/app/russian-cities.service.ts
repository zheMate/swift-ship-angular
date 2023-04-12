import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of  } from 'rxjs';
import {map, skipWhile, tap} from 'rxjs/operators'



@Injectable()
export class RussianCitiesService {

  constructor(private http:HttpClient) { }
  

  getDataFromApi(){    
    return this.http.get('assets/russia.json')
    .pipe
    (map((response:[]) =>  response.map(item => item['name'])))
  }
}
