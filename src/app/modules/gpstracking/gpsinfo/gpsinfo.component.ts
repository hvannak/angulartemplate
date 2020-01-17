import { Component, OnInit, Inject } from '@angular/core';
import { GpstrackingService } from 'src/app/shared/services/gpstracking.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-gpsinfo',
  templateUrl: './gpsinfo.component.html',
  styleUrls: ['./gpsinfo.component.scss']
})
export class GpsinfoComponent implements OnInit {

  orginpoint;
  destpoint;
  constructor(private service:GpstrackingService, private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<GpsinfoComponent>) { }

  ngOnInit() {
     this.orginpoint = this.data.orginpoint;
     this.destpoint = this.data.gps;
  }

}
