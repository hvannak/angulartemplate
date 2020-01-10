import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-companyinfo',
  templateUrl: './companyinfo.component.html',
  styleUrls: ['./companyinfo.component.scss'],
  animations: [
    trigger('fade',[
      transition('void => *',[
        style({backgroundColor:'yellow',opacity:0}),
        animate(4000)
      ])
    ])
  ]
})
export class CompanyinfoComponent implements OnInit,AfterViewInit {
  imageUrl: string = "/assets/images/IMG_6222.png";
  imageUrlsample :string = "/assets/images/sample.png";
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 11.559118;
  lng = 104.872602;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  constructor() { }

  ngOnInit() {
    AOS.init();   
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
   }

   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });



}
