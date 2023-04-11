import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of  } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RussianCitiesService {

  constructor(private http:HttpClient) { }
  opts = [];

  getDataFromApi(){
    return this.opts.length ?
    of(this.opts) :
    this.http.get<any>('assets/russia.json').pipe(tap(data => this.opts = data))
  }
}
