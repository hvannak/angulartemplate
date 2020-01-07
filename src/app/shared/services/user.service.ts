import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private shared:SharedService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { 

  }

  lgForm = this.fb.group({
    UserName: ['',Validators.required],
    Password: ['', Validators.required]
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
}
