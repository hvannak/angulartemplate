import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['Name','Delete'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:RoleService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.patchValue({
      Id: '0'
    });
    this.service.getRolesList().then(res => {
      this.service.roleList = new MatTableDataSource(res as Array<any>);
      this.service.roleList.paginator = this.paginator;
      this.service.roleList.sort = this.sort;
    })
  }

  onSubmit()
  {
    if(this.service.formModel.value.Id == '0'){
      this.postRole();
    }
    else{
      this.putRole();
    }
    
  }

  postRole(){
    this.service.postRoles().then(
      (res:any) => {
        console.log(res);
        if(res.Succeeded){   
           
          this.service.roleList.data.push({
            Id:res.Id,
            Name:this.service.formModel.value.RoleName,
            Access:this.service.formModel.value.SelectedControllers,
            Selected:''
          });
          this.service.roleList._updateChangeSubscription();   
          this.service.formModel.reset();
          this.service.formModel.patchValue({
            Id: '0'
          });
          this.toastr.success("New role created","Register Role");
        }
      },
      err =>{
        console.log(err);
      });
  }

  putRole(){
    this.service.putRoles().then(
      (res:any) => {
        if(res.Succeeded){   
          let index = this.service.roleList.data.findIndex(x=>x.Id == this.service.formModel.value.Id);
          this.service.roleList.data[index].Id = this.service.formModel.value.Id;
          this.service.roleList.data[index].Name = this.service.formModel.value.RoleName;
          this.service.roleList.data[index].Access = this.service.formModel.value.SelectedControllers;
          this.service.roleList._updateChangeSubscription();   
          this.service.formModel.reset();
          this.service.formModel.patchValue({
            Id: '0'
          });
          this.toastr.success("New role updated","Register Role");
        }
      },
      err =>{
        console.log(err);
      }

    );
  }

  openForEdit(item) {
    console.log(item);
    this.service.formModel.setValue({
      Id:item.Id,
      RoleName:item.Name,
      SelectedControllers:''
    });
  }

  applyFilter(filterValue: string) {
    this.service.roleList.filter = filterValue.trim().toLowerCase();
  
    if (this.service.roleList.paginator) {
      this.service.roleList.paginator.firstPage();
    }
  }

  onRoleDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteRole(id).then(res => {
        let index = this.service.roleList.data.findIndex(x=>x.Id == id);
        this.service.roleList.data.splice(index,1);
        this.service.roleList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Restaurent App.");
      });
    }
  }

}
