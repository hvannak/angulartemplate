import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<UserEditComponent>) { }

    ngOnInit() {
      this.service.formModel.reset();
      this.service.getUserById(this.data.id).then((res:any) => {
        this.service.formModel.patchValue({
          UserName:res[0].UserName,
          Email:res[0].Email,
          FullName:res[0].FullName,
          Telephone:res[0].Telephone,
          LinkedCustomerID:res[0].LinkedCustomerID
        });
      });
    }
  
    onSubmit() {
      this.service.putUserandResetpassword(this.data.id,localStorage.getItem('token')).then(
        (res: any) => {
          this.toastr.success("Submitted Successfully","User edit");
        },
        err => {
          console.log(err);
        }
      );
      this.dialogRef.close();
    }

}
