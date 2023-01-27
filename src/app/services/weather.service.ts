import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public http:HttpClient) { }

  apiKey='iCEuLlKyO14clJ3UfyqofkIGTh6IdUq9'
  getLocations(word){
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete',{
      params:{
        apikey:this.apiKey,
        q:word
      }
    });
  }

  getForecasts(location){
    return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+location,{
      params:{
        apikey:this.apiKey,
        details:true
      }
    });
  }

  getNext5Days(location){
    return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+location,{
      params:{
        apikey:this.apiKey,
        details:true
      }
    });
  }


}
