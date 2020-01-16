import { Component, OnInit, ViewChild } from '@angular/core';
import { PrivaciesService } from 'src/app/shared/services/privacies.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class PrivacyComponent implements OnInit {

  displayedColumns: string[] = ['PrivacyName','Delete'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:PrivaciesService,private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.patchValue({
      PrivacyID: 0,
    });
    this.service.getPrivaciesList().then(res => {
      this.service.privaciesList = new MatTableDataSource(res as Array<any>);
      this.service.privaciesList.paginator = this.paginator;
      this.service.privaciesList.sort = this.sort;
    });
  }

  onSubmit()
  {
    if(this.service.formModel.value.PrivacyID == 0){
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
    this.service.postPrivacies().then(
      (res:any) => {
        this.service.privaciesList.data.push({
          PrivacyID:res.PrivacyID,
          PrivacyName:res.PrivacyName,
          PrivacyDescription:res.PrivacyDescription,
        });
        this.service.privaciesList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          LeaveID: 0
        });
        this.toastr.success("Privacy created","Register Privacy");
      },
      err =>{
        console.log(err);
      });
  }

  putTakeleave(){
    this.service.putPrivacies().then(
      (res:any) => {
        let index = this.service.privaciesList.data.findIndex(x=>x.PrivacyID == this.service.formModel.value.PrivacyID);
        this.service.privaciesList.data[index].PrivacyID = this.service.formModel.value.PrivacyID;
        this.service.privaciesList.data[index].PrivacyName = this.service.formModel.value.PrivacyName;
        this.service.privaciesList.data[index].PrivacyDescription = this.service.formModel.value.PrivacyDescription;
        this.service.privaciesList._updateChangeSubscription();
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          LeaveID: 0
        });

        this.toastr.success("Privacy updated","Register Privacy");
      },
      err =>{
        console.log(err);
      }

    );
  }

  openForEdit(item) {
    this.service.formModel.setValue({
      PrivacyID:item.PrivacyID,
      PrivacyName:item.PrivacyName,
      PrivacyDescription:item.PrivacyDescription
    });
  }

  onPrivacyDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePrivacies(id).then(res => {
        let index = this.service.privaciesList.data.findIndex(x=>x.LeaveID == id);
        this.service.privaciesList.data.splice(index,1);
        this.service.privaciesList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Privacy.");
      });
    }
  }

}
