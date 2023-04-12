export class RussianCities{
  constructor(public city:string, public street:string) {}
}

export interface RussianCitiesInterface{
    cityName: string;
    districtName: string;
}