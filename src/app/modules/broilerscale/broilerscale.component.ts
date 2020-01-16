import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialogConfig, MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ScaleService } from 'src/app/shared/services/scale.service';
import { ToastrService } from 'ngx-toastr';
import { ImagedisplayComponent } from '../imagedisplay/imagedisplay.component';

@Component({
  selector: 'app-broilerscale',
  templateUrl: './broilerscale.component.html',
  styleUrls: ['./broilerscale.component.scss']
})
export class BroilerscaleComponent implements OnInit {

  fromDate:Date;
  toDate:Date;
  projectId:string;
  displayedColumns: string[] = ['GroupID','CustomerID','CustomerName','TypeOfScale','Weight','DateOfScale','ProjectID','TypeOfItem','NumOfTrap','NumOfChicken','UnitPrice','LocationID','ViewImg'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  totalNumOfTrap;
  totalWeightTrap;
  totalTotalWeight;
  totalNumOfTotalTrap;
  totalChicken;
  totalNetWeight;
  constructor(public service:ScaleService,private router: Router,
    private toastr:ToastrService,private dialog: MatDialog) {
      this.projectId = '*';
     }

  ngOnInit() {
    this.service.getBroilerList().then(res => {
      this.service.broilerList = new MatTableDataSource(res as Array<any>);
      this.service.broilerList.paginator = this.paginator;
      this.service.broilerList.sort = this.sort;
      this.getTotal();
    })
  }

  viewImage(Image1){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { Image1 };
    this.dialog.open(ImagedisplayComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log('done');
    });
  }

  getBroilerScaleByDate(from,to,projectId){
    this.service.getBroilerListByDate(from,to,projectId).then(res => {
      this.service.broilerList = new MatTableDataSource(res as Array<any>);
      this.service.broilerList.paginator = this.paginator;
      this.service.broilerList.sort = this.sort;
      this.getTotal();
    }); 
  }

  onSubmit(){
    this.getBroilerScaleByDate(formatDate(this.fromDate,environment.format,environment.locale),formatDate(this.toDate,environment.format,environment.locale),this.projectId);
  }
  
  getTotal() {
    this.totalNumOfTotalTrap = this.service.broilerList.data.filter(x=>x.TypeOfScale == 'P').map(t => t.NumOfTrap).reduce((acc, value) => acc + value, 0);
    this.totalWeightTrap = this.service.broilerList.data.filter(x=>x.TypeOfScale == 'P').map(t => t.Weight).reduce((acc, value) => acc + value, 0);
    this.totalNumOfTotalTrap = this.service.broilerList.data.filter(x=>x.TypeOfScale == 'W').map(t => t.NumOfTrap).reduce((acc, value) => acc + value, 0);
    this.totalTotalWeight = this.service.broilerList.data.filter(x=>x.TypeOfScale == 'W').map(t => t.Weight).reduce((acc, value) => acc + value, 0);
    this.totalChicken = this.service.broilerList.data.filter(x=>x.TypeOfScale == 'W').map(t => t.NumOfChicken).reduce((acc, value) => acc + value, 0);
    this.totalNetWeight = this.totalTotalWeight - this.totalWeightTrap;
  }

}
