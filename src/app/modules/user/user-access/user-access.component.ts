import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {

  displayedColumns: string[] = ['UserName','Delete','Edit'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  rolesList: any[];
  constructor(public service:UserService,private router: Router,private roleService:RoleService,
    private toastr:ToastrService,private dialog: MatDialog) {

     }

  ngOnInit() {
    this.refressList();
    this.onGetRole();
  }

  populateForm(item){
    this.service.userroleModel.setValue({
      UserId:item.UserId,
      UserName:item.UserName,
      Roles:item.Roles
    });
    this.service.rolesAdded = item.Roles;
    console.log(this.service.rolesAdded);
    this.service.userroleModel.get('UserName').disable();
  }

  onUserEdit(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { id };
    this.dialog.open(UserEditComponent, dialogConfig).afterClosed().subscribe(res => {
      let index = this.service.userroleList.data.findIndex(x=>x.UserId == id);
      this.service.userroleList.data[index].UserName = this.service.formModel.value.UserName;
      this.service.userroleList._updateChangeSubscription();
    });
  }

  applyFilter(filterValue: string) {
    this.service.userroleList.filter = filterValue.trim().toLowerCase();
  
    if (this.service.userroleList.paginator) {
      this.service.userroleList.paginator.firstPage();
    }
  }

  refressList(){
    this.service.getUserRoles().then((res:any) => {
      this.service.userroleList = new MatTableDataSource(res as Array<any>);
      this.service.userroleList.paginator = this.paginator;
      this.service.userroleList.sort = this.sort;
    });
  }

  onUserDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).then(res => {
        this.refressList();
        this.toastr.warning("Deleted Successfully", "User Roles.");
      });
    }
  }

  onSubmit(){
    this.service.userroleModel.value.Roles = this.service.rolesAdded;
    this.service.putUser().then(res => {
      this.service.userroleModel.reset();
      this.toastr.success("Submitted Successfully","User Roles");
    })
  }
  
  onGetRole(){
    this.roleService.getRolesList().then(res => this.rolesList  = res as any[]);;   
  }

  onDelete(item:any){
    this.service.onDelete(item);
  }

  onAdd(item:any):void{
    this.service.onAdd(item);
  }

}
