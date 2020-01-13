import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleList:MatTableDataSource<any>;
  public _parentnode:string;
  public _childnode:string;
  constructor(private shared:SharedService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { }

  formModel = this.fb.group({
    Id:[''],
    RoleName:['',Validators.required],
    SelectedControllers:[''],
  });

  permits: any[] = [
    {value: 'N', viewValue: 'None'},
    {value: 'A', viewValue: 'Allow'},
    {value: 'D', viewValue: 'Disallow'}
  ];

  postRoles(){
    return this.shared.postData(this.formModel.value,'/ApplicationRole');
  }

  putRoles(){
    return this.shared.putData(this.formModel.value,'/ApplicationRole/', this.formModel.value.Id);
  }

  onPutRoles(controllerAdded){
    var body = {
      Id:this.formModel.value.Id,
      RoleName: this.formModel.value.RoleName,
      SelectedControllers:controllerAdded
    }
    return this.shared.putData(body,'/ApplicationRole/', this.formModel.value.Id);
  }

  getRolesList() {
    return this.shared.getAllData('/ApplicationRole');
  }

  getRoleByID(id:string):any{
    return this.shared.getDataById('/ApplicationRole/',id);
  }

  checkedThisUserIsAdmin():any{
    return this.shared.getAllData('/ApplicationRole/UserId');
  }

  deleteRole(id:string) {
    return this.shared.deleteData('/ApplicationRole/',id);
  }

  getTreeList(){
    return this.shared.getAllData('/CtlDiscovery');
   }

}
