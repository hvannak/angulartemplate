import { Component, OnInit, Inject } from '@angular/core';
import { GpstrackingService } from 'src/app/shared/services/gpstracking.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gpsmanual',
  templateUrl: './gpsmanual.component.html',
  styleUrls: ['./gpsmanual.component.scss']
})
export class GpsmanualComponent implements OnInit {

  imageUrl: string = "/assets/images/default-image.png";
  fileToUpload: File = null;
  customerList;
  constructor(public service:GpstrackingService, private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<GpsmanualComponent>) { }

  ngOnInit() {
    if(this.data.gpsId == null){
      this.service.formgps.reset();
      this.service.formgps.patchValue({
        GpsID:0
      });
    }
    else{
      this.service.formgps.setValue(this.data.gpsId);
      this.imageUrl = this.service.formgps.value.Image;
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      this.service.formgps.patchValue({
        Image: this.imageUrl
      });

    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit(){
    this.service.formgps.value.Gpsdatetime = formatDate(this.service.formgps.value.Gpsdatetime,environment.format,environment.locale) + ',' + formatDate(new Date(), 'HH:mm:ss', environment.locale) ;
    if(this.service.formgps.value.GpsID == 0){
      this.service.postGpstracking().then(res => {
        this.service.gpsTrackingList.push(this.service.formgps.value);
        this.toastr.info("Data input sucessfully","GPS Manual");
      });
      this.dialogRef.close();
    }
    else{
      this.service.putGpstracking().then(res =>{
        let index = this.service.gpsTrackingList.findIndex(x=>x.GpsID == this.service.formgps.value.GpsID);
        this.service.gpsTrackingList[index] = this.service.formgps.value;
        this.toastr.info("Data update sucessfully","GPS Manual");
      });
      this.dialogRef.close();
    }
  }

  onSearchCustomer(){
    var data = document.getElementById('customer') as HTMLInputElement; 
    if(data.value != ''){
      this.service.getCustomerByName(data.value).then((res:any) =>{
        this.customerList = res
      });
    }
  }

}
