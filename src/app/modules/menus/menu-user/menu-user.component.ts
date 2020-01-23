import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  userList;
  userMenuList:any[];
  userIdClicked;
  displayedColumns: string[] = ['Name','RouterLink','Permit'];
  displayedColumnsuser: string[] = ['UserName'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service: UserService,public menuService: MenuService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.userIdClicked = '';
    this.userMenuList=[];
    this.service.getUsers().then(res => {
      // this.userList = res
      this.userList = new MatTableDataSource(res as Array<any>);
      // this.userList.paginator = this.paginator;
      // this.userList.sort = this.sort;
    });
    this.menuService.getMenuappList().then(res => {
      this.menuService.menuList = new MatTableDataSource(res as Array<any>);
      this.menuService.menuList.paginator = this.paginator;
      this.menuService.menuList.sort = this.sort;
    })
  }
  applyFilter(filterValue: string) {
    this.userList.filter = filterValue.trim().toLowerCase(); 
  }

  onClickUser(userId){
    this.userIdClicked = userId;
    this.service.getUserMenusByUserId(userId).then(res => {
      this.userMenuList = res as Array<any>;
      for (var i = 0; i < this.menuService.menuList.data.length; i++) {
        let index = this.userMenuList.findIndex(x=>x.MenuId == this.menuService.menuList.data[i].MenuId);
        if(index >= 0){
          this.menuService.menuList.data[i].Selected = 'A';
          this.menuService.menuList._updateChangeSubscription();
        }
        else{
          this.menuService.menuList.data[i].Selected = 'D';
          this.menuService.menuList._updateChangeSubscription();
        }
      }
    });
  }

  onChangePermit(event,element){
    if(event.value != ''){
      if(event.value == 'A'){
        //Add
        this.service.usermenuModel.setValue({
          AppMenuId: 0,
          MenuId:element.MenuId,
          UserId:this.userIdClicked
        });
        this.onPostUserMenu();
      }
      else if(event.value == 'D'){
        //Delete
        this.onDeletUserMenu(element.MenuId,this.userIdClicked);
      }
    }
  }

  onPostUserMenu(){
    if(this.userIdClicked != ''){
      this.service.postUserMenus().then(res => {
        this.toastr.success("Menu added","Menu Access");
      });
    }
    else{
      this.toastr.warning("Please select user before allow menu","Menu Access");
    }

  }

  onDeletUserMenu(menuId:number,userId:string){
    if(this.userIdClicked != ''){
      this.service.deletUserMenus(menuId.toString(),userId).then(res =>{
        this.toastr.success("Menu deleted","Menu Access");
      });
    }
    else{
      this.toastr.warning("Please select user before disallow menu","Menu Access");
    }
  }

}
