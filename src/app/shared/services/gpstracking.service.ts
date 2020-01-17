import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class GpstrackingService {

  gpsTrackingList:Array<any>;
  constructor(private fb:FormBuilder,private shared:SharedService) {

   }

   formgps = this.fb.group({
    GpsID:[''],
    Lat:['',Validators.required],
    Lng:['',Validators.required],
    Gpsdatetime:['',Validators.required],
    CheckType:['',Validators.required],
    Customer:['',Validators.required],
    Image:['',Validators.required],
    UserId:['']
   });

  getGpsList(){
    return this.shared.getAllData('/Gpstrackings');
  }

  postGpstracking(){
    return this.shared.postData(this.formgps.value, '/Gpstrackings');
  }

  putGpstracking(){
    return this.shared.putData(this.formgps.value, '/Gpstrackings/', this.formgps.value.GpsID);
  }

  deleteGpstracking(id:string) {
    return this.shared.deleteData('/Gpstrackings/',id);
  }

  getCustomerByName(name:string){
    return this.shared.getDataById('/Customer/CustomerName/', name);
  }

  getGpstrackingByDate(from:Date,to:Date,userId:string){
    return this.shared.getDataByThreeParam('/Gpstrackings/GpstrackingsByDate/', from.toString() , to.toString() , userId);
  }
}
