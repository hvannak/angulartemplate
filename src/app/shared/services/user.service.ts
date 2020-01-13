import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rolesAdded = [];
  userroleList:MatTableDataSource<any>;
  constructor(private shared:SharedService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { 

  }

  lgForm = this.fb.group({
    UserName: ['',Validators.required],
    Password: ['', Validators.required]
  });

  permits: any[] = [
    {value: 'N', viewValue: 'None'},
    {value: 'A', viewValue: 'Allow'},
    {value: 'D', viewValue: 'Disallow'}
  ];

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Telephone:['',Validators.required],
    LinkedCustomerID:[''],
    DefaultRole:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

   userroleModel = this.fb.group({
    UserId: [''],
    UserName: ['', Validators.required],
    Roles: ['']
  });

  usermenuModel = this.fb.group({
    AppMenuId: [''],
    MenuId: ['',Validators.required],
    UserId: ['',Validators.required]
  });

  login(){
    this.shared.postData(this.lgForm.value,'/ApplicationUser/Login').then((res:any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/');
    },err => {
      if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
    })
  }

  getprofile(){
    return this.shared.getAllData('/UserProfile');
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  onDelete(item:any){
    console.log(item);
    console.log(this.rolesAdded);
    var index = this.rolesAdded.indexOf(item.Name);
    console.log(index);
    if (index > -1) {
      this.rolesAdded.splice(index, 1);
    }
  }

  onAdd(item:any):void{
    var index = this.rolesAdded.indexOf(item.Name);
    console.log(index);
    if(index <= -1){
      this.rolesAdded.push(item.Name);
    }
  }

  register() {
    return this.shared.postData(this.formModel.value,'/ApplicationUser/Register');
  }

  putUser(){
    var body = {
      UserId: this.userroleModel.value.UserId,
      UserName: this.userroleModel.value.UserName,
      Roles: this.userroleModel.value.Roles
    };
    return this.shared.putData(body,'/Access/', this.userroleModel.value.UserId);
  }

  getUserById(id:string){
    return this.shared.getDataById('/ApplicationUser/' , id);
  }

  putUserandResetpassword(id:string,token:string){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Telephone:this.formModel.value.Telephone,
      LinkedCustomerID:this.formModel.value.LinkedCustomerID,
      Password: this.formModel.value.Passwords.Password
    };

    return this.shared.putData2(body,'/ApplicationUser/', id , token);
  }

  getUserRoles(){
    return this.shared.getAllData('/Access');
  }

  getUsers(){
    return this.shared.getAllData('/ApplicationUser');
  }

  deleteUser(id:string){
    return this.shared.deleteData('/Access/' , id);
  }


  //========User Menus
  getUserMenusByUserId(id:string){
    return this.shared.getDataById("/ApplicationUserMenus/", id);
  }

  postUserMenus(){
    return this.shared.postData(this.usermenuModel.value,'/ApplicationUserMenus/');
  }

  deletUserMenus(id:string,userid:string){
    return this.shared.deleteData2('/ApplicationUserMenus/', id , userid);
  }
}
