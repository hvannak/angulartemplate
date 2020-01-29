import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  profile;
  menuList:any[];
  pageList:any[];
  identityList:any[];
  menusList:any[];
  constructor(private service:UserService,private serviceMenu:MenuService) { 
    this.menuList = [];
    this.pageList= [];
    this.identityList =[];
    this.menusList = [];
  }

  ngOnInit() {
    this.service.getprofile().then((res:any) => {
      this.profile = res;
      localStorage.setItem('linkedID', res.LinkedCustomerID);
      localStorage.setItem('fullname',res.FullName);
      localStorage.setItem('userId',res.Id);
    });

    this.serviceMenu.getUserMenurootList().then(res => {
      this.menuList = res as Array<any>;
      localStorage.setItem('menus',JSON.stringify(this.menuList));
    });

  }

}
