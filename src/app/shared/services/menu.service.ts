import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  userMenuList:any[];
  menuList:MatTableDataSource<any>;
  menurootList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private shared:SharedService) { 

  }

  formModel = this.fb.group({
    MenuId:[''],
    RootId:['',Validators.required],
    Name:['',Validators.required],
    Icon:['',Validators.required],
    RouterLink:['',Validators.required]
  });

  formRoot = this.fb.group({
    MenuId:[''],
    RootMenuId:['',Validators.required],
    Icon:['',Validators.required],
    Label:['']
  });

  //=====================Menuapp

  postMenuapp(){
    var body = {
      RootId: this.formModel.value.RootId,
      Name: this.formModel.value.Name,
      Icon:this.formModel.value.Icon,
      RouterLink:this.formModel.value.RouterLink
    }
    return this.shared.postData(body,'/ApplicationMenu');
  }

  putMenuapp(){
    var body = {
      MenuId:this.formModel.value.MenuId,
      RootId: this.formModel.value.RootId,
      Name: this.formModel.value.Name,
      Icon:this.formModel.value.Icon,
      RouterLink:this.formModel.value.RouterLink
    }
    return this.shared.putData(body, '/ApplicationMenu/', this.formModel.value.MenuId);
  }

  getMenuappList() {
    return this.shared.getAllData('/ApplicationMenu');
  }

  getMenuappByID(id:string):any{
    return this.shared.getDataById('/ApplicationMenu/',id);
  }

  deleteMenuapp(id:number) {
    return this.shared.deleteData('/ApplicationMenu/',id.toString());
  }

//========================Menu Root

  postMenuroot(){
    var body = {
      RootMenuId: this.formRoot.value.RootMenuId,
      Icon: this.formRoot.value.Icon,
      Label:this.formRoot.value.Label
    }
    return this.shared.postData(body,'/ApplicationRootMenus');
  }

  putMenuroot(){
    var body = {
      MenuId:this.formRoot.value.MenuId,
      RootMenuId: this.formRoot.value.RootMenuId,
      Icon: this.formRoot.value.Icon,
      Label:this.formRoot.value.Label
    }
    return this.shared.putData(body,'/ApplicationRootMenus/', this.formRoot.value.MenuId);
  }

  getMenurootList() {
    return this.shared.getAllData('/ApplicationRootMenus');
  }

  getMenurootByID(id:number):any{
    return this.shared.getDataById('/ApplicationRootMenus/',id.toString());
  }

  deleteMenuroot(id:number) {
    return this.shared.deleteData('/ApplicationRootMenus/',id.toString());
  }

  //===============Usermenu
  getUserMenurootList() {
    return this.shared.getAllData('/ApplicationUserMenus');
  }

  
  postUserMenuValidate(url:string){
    var body= {
      MenuId: 0,
      RootId: 0,
      Name:'',
      Icon:'',
      RouterLink:url
    }
    return this.shared.postData(body,'/ApplicationUserMenus/Validate');
  }
  
}
