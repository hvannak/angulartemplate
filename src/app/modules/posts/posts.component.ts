import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit() {
  }

  Test(){
    this.service.getprofile().then(res => {
      console.log(res);
    })
  }

}
