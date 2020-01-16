import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PrivaciesService {

  privaciesList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private shared:SharedService) { }

  formModel = this.fb.group({
    PrivacyID:[''],
    PrivacyName:['',Validators.required],
    PrivacyDescription:['',Validators.required],
  });
  
  postPrivacies(){
    var body = {
      PrivacyName: this.formModel.value.PrivacyName,
      PrivacyDescription: this.formModel.value.PrivacyDescription,
    }
    return this.shared.postData(body,'/Privacies');
  }

  putPrivacies(){
    var body = {
      PrivacyID:this.formModel.value.PrivacyID,
      PrivacyName: this.formModel.value.PrivacyName,
      PrivacyDescription: this.formModel.value.PrivacyDescription,
    }
    return this.shared.putData(body,'/Privacies/', this.formModel.value.PrivacyID);
  }

  getPrivaciesList() {
    return this.shared.getAllData('/Privacies');
  }

  getPrivaciesByID(id:string):any{
    return this.shared.getDataById('/Privacies/',id);
  }

  getPrivaciesByName(name:string):any{
    return this.shared.getDataById('/PrivacyView/Name/',name);
  }

  deletePrivacies(id:string) {
    return this.shared.deleteData('/Privacies/',id);
  }
}
