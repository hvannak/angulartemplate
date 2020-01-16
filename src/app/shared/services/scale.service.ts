import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  pigList:MatTableDataSource<any>;
  broilerList:MatTableDataSource<any>;
  truckList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private shared:SharedService) { }

  getPigList() {
    return this.shared.getAllData('/PigScales');
  }

  getPigListByDate(from:Date,to:Date,projectId:string){
    return this.shared.getDataByThreeParam('/PigScales/PigScaleByDate/', from.toString(), to.toString(), projectId);
  }

  getBroilerList(){
    return this.shared.getAllData('/BroilerScales');
  }

  getBroilerListByDate(from:Date,to:Date,projectId:string){
    return this.shared.getDataByThreeParam('/BroilerScales/BroilerScaleByDate/', from.toString(), to.toString(), projectId);
  }

  getTruckList(){
    return this.shared.getAllData('/TruckScales');
  }

  getTruckByDate(from:Date,to:Date){
    return this.shared.getDataByTwoParam('/TruckScales/TruckScaleByDate/',from.toString(),to.toString());
  }
}
