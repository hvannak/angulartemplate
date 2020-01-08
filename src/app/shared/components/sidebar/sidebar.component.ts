import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  profile;
  constructor(private service:UserService) { }

  ngOnInit() {
    this.service.getprofile().then((res:any) => {
      this.profile = res;
    });
  }

}
