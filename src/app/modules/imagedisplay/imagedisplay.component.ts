import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-imagedisplay',
  templateUrl: './imagedisplay.component.html',
  styleUrls: ['./imagedisplay.component.scss']
})
export class ImagedisplayComponent implements OnInit {

  image1;
  image2;
  constructor(private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ImagedisplayComponent>) { }

  ngOnInit() {
    this.image1 = this.data.Image1;
    this.image2 = this.data.Image2;
  }

}
