import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.scss']
})
export class MenuAppComponent implements OnInit {

  rootMenu;
  displayedColumns: string[] = ['Name','Icon','RouterLink','Delete'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:MenuService,private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.patchValue({
      MenuId: 0
    });
    this.service.getMenurootList().then(res => {
      this.rootMenu = res as Array<any>
    });
    this.service.getMenuappList().then(res => {
      this.service.menuList = new MatTableDataSource(res as Array<any>);
      this.service.menuList.paginator = this.paginator;
      this.service.menuList.sort = this.sort;
    })
  }

  onChangeRootId(event){

  }

  onSubmit()
  {
    if(this.service.formModel.value.MenuId == 0){
      this.postMenuapp();
    }
    else{
      this.putMenuapp();
    }
    
  }

  postMenuapp(){
    this.service.postMenuapp().then(
      (res:any) => {
        this.service.menuList.data.push({
          MenuId:res.MenuId,
          RootId:res.RootId,
          Rootname:res.Rootname,
          Name:res.Name,
          Icon:res.Icon,
          RouterLink:res.RouterLink,
          Selected:''
        });
        this.service.menuList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          MenuId: 0
        });
        this.toastr.success("Menu created","Register Menu");
      },
      err =>{
        console.log(err);
      });
  }

  putMenuapp(){
    this.service.putMenuapp().then(
      (res:any) => {
        let index = this.service.menuList.data.findIndex(x=>x.MenuId == this.service.formModel.value.MenuId);
        this.service.menuList.data[index].MenuId = this.service.formModel.value.MenuId;
        this.service.menuList.data[index].RootId = this.service.formModel.value.RootId;
        this.service.menuList.data[index].Name = this.service.formModel.value.Name;
        this.service.menuList.data[index].Icon = this.service.formModel.value.Icon;
        this.service.menuList.data[index].RouterLink = this.service.formModel.value.RouterLink;
        this.service.menuList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
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
    this.service.formModel.setValue({
      MenuId:item.MenuId,
      RootId:item.RootId,
      Name:item.Name,
      Icon:item.Icon,
      RouterLink:item.RouterLink
    });
  }

  applyFilter(filterValue: string) {
    this.service.menuList.filter = filterValue.trim().toLowerCase(); 
    if (this.service.menuList.paginator) {
      this.service.menuList.paginator.firstPage();
    }
  }

  onMenusDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteMenuapp(id).then(res => {
        let index = this.service.menuList.data.findIndex(x=>x.MenuId == id);
        this.service.menuList.data.splice(index,1);
        this.service.menuList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Menu App.");
      });
    }
  }

}
