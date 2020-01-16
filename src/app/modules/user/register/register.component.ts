import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().then(
      (res: any) => {
        if(res != null){
          if (res.Succeeded) {
            this.service.formModel.reset();
            this.toastr.success('New user created!', 'Registration successful.');
          } else {
            res.Errors.forEach(element => {
              switch (element.Code) {
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken','Registration failed.');
                  break;
  
                default:
                this.toastr.error(element.Description,'Registration failed.');
                  break;
              }
            });
          }
        }
        else{
          this.toastr.error('Registration failed.Your entity Id is not exist.');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
