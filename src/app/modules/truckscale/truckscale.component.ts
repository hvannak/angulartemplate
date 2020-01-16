import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ScaleService } from 'src/app/shared/services/scale.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagedisplayComponent } from '../imagedisplay/imagedisplay.component';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-truckscale',
  templateUrl: './truckscale.component.html',
  styleUrls: ['./truckscale.component.scss']
})
export class TruckscaleComponent implements OnInit {

  fromDate:Date;
  toDate:Date;
  displayedColumns: string[] = ['RefNbr','TruckID','CustomerID','CustomerName','TruckWeight','TotalWeight','ItemWeight','Description','DateOfScale','SecondDateOfScale','Location','ViewImge'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:ScaleService,private router: Router,
    private toastr:ToastrService,private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getTruckList().then(res => {
      this.service.truckList = new MatTableDataSource(res as Array<any>);
      this.service.truckList.paginator = this.paginator;
      this.service.truckList.sort = this.sort;
    })
  }

  viewImage(Image1,Image2){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { Image1,Image2 };
    this.dialog.open(ImagedisplayComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log('done');
    });
  }
  
  getTruckScaleByDate(from,to){
    this.service.getTruckByDate(from,to).then(res => {
      this.service.truckList = new MatTableDataSource(res as Array<any>);
      this.service.truckList.paginator = this.paginator;
      this.service.truckList.sort = this.sort;
    }); 
  }

  onSubmit(){
    this.getTruckScaleByDate(formatDate(this.fromDate,environment.format,environment.locale),formatDate(this.toDate,environment.format,environment.locale));
  }

}
