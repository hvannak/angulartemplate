import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-root',
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss']
})
export class MenuRootComponent implements OnInit {

  displayedColumns: string[] = ['RootMenuId','Icon','Label','Delete'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:MenuService,private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formRoot.patchValue({
      MenuId: 0
    });
    this.service.getMenurootList().then(res => {
      this.service.menurootList = new MatTableDataSource(res as Array<any>);
      this.service.menurootList.paginator = this.paginator;
      this.service.menurootList.sort = this.sort;
    })
  }

  onSubmit()
  {
    if(this.service.formRoot.value.MenuId == 0){
      this.postMenuapp();
    }
    else{
      this.putMenuapp();
    }
    
  }

  postMenuapp(){
    this.service.postMenuroot().then(
      (res:any) => {
        this.service.menurootList.data.push({
          MenuId:res.MenuId,
          RootMenuId:res.RootMenuId,
          Icon:res.Icon,
          Label:res.Label
        });
        this.service.menurootList._updateChangeSubscription();
        this.service.formRoot.reset();
        this.service.formRoot.patchValue({
          RootMenuId: ''
        });
        this.toastr.success("Menu created","Register Menu");
      },
      err =>{
        console.log(err);
      });
  }

  putMenuapp(){
    this.service.putMenuroot().then(
      (res:any) => {
        let index = this.service.menurootList.data.findIndex(x=>x.MenuId == this.service.formRoot.value.MenuId);
        this.service.menurootList.data[index].RootMenuId = this.service.formRoot.value.RootMenuId;
        this.service.menurootList.data[index].Icon = this.service.formRoot.value.Icon;
        this.service.menurootList.data[index].Label = this.service.formRoot.value.Label;
        this.service.menurootList._updateChangeSubscription();
        this.service.formRoot.reset();
        this.service.formRoot.patchValue({
          MenuId: 0
        });

        this.toastr.success("Menu updated","Register Menu");
      },
      err =>{
        console.log(err);
      }

    );
  }

  openForEdit(item) {
    this.service.formRoot.setValue({
      MenuId:item.MenuId,
      RootMenuId:item.RootMenuId,
      Icon:item.Icon,
      Label:item.Label
    });
  }

  applyFilter(filterValue: string) {
    this.service.menurootList.filter = filterValue.trim().toLowerCase(); 
    if (this.service.menurootList.paginator) {
      this.service.menurootList.paginator.firstPage();
    }
  }

  onMenusDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteMenuroot(id).then(res => {
        let index = this.service.menurootList.data.findIndex(x=>x.MenuId == id);
        this.service.menurootList.data.splice(index,1);
        this.service.menurootList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Menu App.");
      });
    }
  }

}
