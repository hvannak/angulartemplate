import { Component, OnInit } from '@angular/core';
import { PrivaciesService } from 'src/app/shared/services/privacies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy-view',
  templateUrl: './privacy-view.component.html',
  styleUrls: ['./privacy-view.component.scss']
})
export class PrivacyViewComponent implements OnInit {

  privacyList;
  constructor(public service:PrivaciesService,private router: Router,private currentRoute: ActivatedRoute) {
    this.privacyList = [];
   }

  ngOnInit() {
    console.log('test');
    let privacyname = this.currentRoute.snapshot.paramMap.get('name');
    this.service.getPrivaciesByName(privacyname).then(res => {
        this.privacyList = res;
    });
  }

}
