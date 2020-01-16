import { Component, OnInit, ViewChild } from '@angular/core';
import { TakeleaveService } from 'src/app/shared/services/takeleave.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-takeleave',
  templateUrl: './takeleave.component.html',
  styleUrls: ['./takeleave.component.scss']
})
export class TakeleaveComponent implements OnInit {

  userId;
  fromdate;
  todate;
  userList;
  displayedColumns: string[] = ['EmployeeName','WorkPlace','FromDate','ToDate','Reasion','Delete'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:TakeleaveService,private userService:UserService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.patchValue({
      LeaveID: 0,
      EmployeeName:localStorage.getItem('fullname')
    });
    this.service.getTakeleaveList().then(res => {
      this.service.leaveList = new MatTableDataSource(res as Array<any>);
      this.service.leaveList.paginator = this.paginator;
      this.service.leaveList.sort = this.sort;
    });
    this.userService.getUsers().then(res => {
      this.userList = res;
    });
  }

  onSubmit()
  {
    if(this.service.formModel.value.LeaveID == 0){
      console.log('post');
      this.postTakeleave();
    }
    else{
      console.log('put');
      this.putTakeleave();
    }    
  }

  postTakeleave(){
    console.log(this.service.formModel.value);
    this.service.postTakeleave().then(
      (res:any) => {
        this.service.leaveList.data.push({
          LeaveID:res.LeaveID,
          EmployeeName:res.EmployeeName,
          WorkPlace:res.WorkPlace,
          FromDate:res.FromDate,
          ToDate:res.ToDate,
          Reasion:res.Reasion
        });
        this.service.leaveList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          LeaveID: 0,
          EmployeeName:localStorage.getItem('fullname')
        });
        this.toastr.success("Leave created","Register Leave");
      },
      err =>{
        console.log(err);
      });
  }

  putTakeleave(){
    this.service.putTakeleave().then(
      (res:any) => {
        let index = this.service.leaveList.data.findIndex(x=>x.LeaveID == this.service.formModel.value.LeaveID);
        this.service.leaveList.data[index].LeaveID = this.service.formModel.value.LeaveID;
        this.service.leaveList.data[index].EmployeeName = this.service.formModel.value.EmployeeName;
        this.service.leaveList.data[index].WorkPlace = this.service.formModel.value.WorkPlace;
        this.service.leaveList.data[index].FromDate = this.service.formModel.value.FromDate;
        this.service.leaveList.data[index].ToDate = this.service.formModel.value.ToDate;
        this.service.leaveList.data[index].Reasion = this.service.formModel.value.Reasion;
        this.service.leaveList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          LeaveID: 0,
          EmployeeName:localStorage.getItem('fullname')
        });

        this.toastr.success("Leave updated","Register Leave");
      },
      err =>{
        console.log(err);
      }

    );
  }

  onSearch(){
    console.log(this.userId);
    this.getTakeLeaveByDate(this.userId,formatDate(this.fromdate,environment.format,environment.locale),formatDate(this.todate,environment.format,environment.locale));
  }

  getTakeLeaveByDate(name,fromdate,todate){
    this.service.getTakeLeaveByDate(name,fromdate,todate).then((res:any) =>{
      this.service.leaveList = new MatTableDataSource(res as Array<any>);
      this.service.leaveList.paginator = this.paginator;
      this.service.leaveList.sort = this.sort;
    })
  }

  openForEdit(item) {
    this.service.formModel.setValue({
      LeaveID:item.LeaveID,
      EmployeeName:item.EmployeeName,
      WorkPlace:item.WorkPlace,
      FromDate:item.FromDate,
      ToDate:item.ToDate,
      Reasion:item.Reasion
    });
  }

  applyFilter(filterValue: string) {
    this.service.leaveList.filter = filterValue.trim().toLowerCase(); 
    if (this.service.leaveList.paginator) {
      this.service.leaveList.paginator.firstPage();
    }
  }

  onLeaveDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTakeleave(id).then(res => {
        let index = this.service.leaveList.data.findIndex(x=>x.LeaveID == id);
        this.service.leaveList.data.splice(index,1);
        this.service.leaveList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Leave.");
      });
    }
  }

}
