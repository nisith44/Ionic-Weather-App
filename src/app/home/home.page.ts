import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filteredLocations=[]
  selectedLocation: any;
  wetherData: any;
  day2: any;
  day3: any;
  day4: any;
  headline: any;
  location:any;
  constructor(public weatherService:WeatherService) {
    weatherService.getLocations("Toronto").subscribe((res:any)=>{
      console.log(res);
      this.filteredLocations=res
      this.selectedLocation=this.filteredLocations[0];
      this.getWeatherData()
    })

    navigator.geolocation.getCurrentPosition((p)=>{
      this.location=p.coords
      console.log("loca",p);
    })
  }

  locationSearch(e) {
    console.log(e.target.value);
    this.weatherService.getLocations(e.target.value).subscribe((res:any)=>{
      console.log(res);
      this.filteredLocations=res
    })
  }

  selectLocation(item) {
    this.selectedLocation = item;
    this.getWeatherData()
  }

  getWeatherData(){
    // this.weatherService.getForecasts(this.selectedLocation.Key).subscribe((res:any)=>{
    //   this.wetherData=res.DailyForecasts[0]
    //   console.log(this.wetherData);
    // })

    this.weatherService.getNext5Days(this.selectedLocation.Key).subscribe((res:any)=>{
      this.wetherData=res.DailyForecasts[0]
      this.headline=res.Headline
      this.day2=res.DailyForecasts[1]
      this.day3=res.DailyForecasts[2]
      this.day4=res.DailyForecasts[3]
      console.log(this.wetherData);
    })
  }

  getDay(day){
    let aaa=moment(day).format('dddd');
    return aaa;
  }

  formatDate(date,format){
    let aaa=moment(date).format(format);
    return aaa;
  }

  fToCelsius(f){
    return (f-32)*5/9;
  }

}
