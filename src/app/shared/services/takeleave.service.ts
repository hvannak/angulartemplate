import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TakeleaveService {

  leaveList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private http:HttpClient,private shared:SharedService) { 

  }

  formModel = this.fb.group({
    LeaveID:[''],
    EmployeeName:['',Validators.required],
    WorkPlace:['',Validators.required],
    FromDate:['',Validators.required],
    ToDate:['',Validators.required],
    Reasion:['',Validators.required]
  });
  
  postTakeleave(){
    var body = {
      EmployeeName: this.formModel.value.EmployeeName,
      WorkPlace: this.formModel.value.WorkPlace,
      FromDate:this.formModel.value.FromDate,
      ToDate:this.formModel.value.ToDate,
      Reasion:this.formModel.value.Reasion
    }
    return this.shared.postData(body,'/TakeLeaves');
  }

  putTakeleave(){
    var body = {
      LeaveID:this.formModel.value.LeaveID,
      EmployeeName: this.formModel.value.EmployeeName,
      WorkPlace: this.formModel.value.WorkPlace,
      FromDate:this.formModel.value.FromDate,
      ToDate:this.formModel.value.ToDate,
      Reasion:this.formModel.value.Reasion
    }
    return this.shared.putData(body, '/TakeLeaves/', this.formModel.value.LeaveID);
  }

  getTakeleaveList() {
    return this.shared.getAllData('/TakeLeaves');
  }

  getTakeLeaveByDate(name:string,fromdate:Date,todate:Date){
    return this.shared.getDataByThreeParam('/TakeLeaves/Date/', name , fromdate.toString() , todate.toString());
  }

  getTakeleaveByID(id:string):any{
    return this.shared.getDataById('/TakeLeaves/',id);
  }

  deleteTakeleave(id:string) {
    return this.shared.deleteData('/TakeLeaves/',id);
  }
}
