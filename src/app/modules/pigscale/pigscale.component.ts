import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ScaleService } from 'src/app/shared/services/scale.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagedisplayComponent } from '../imagedisplay/imagedisplay.component';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pigscale',
  templateUrl: './pigscale.component.html',
  styleUrls: ['./pigscale.component.scss']
})
export class PigscaleComponent implements OnInit {

  fromDate:Date;
  toDate:Date;
  projectId:string;
  numberofPig;
  weightofPig;
  displayedColumns: string[] = ['GroupID','CustomerID','CustomerName','PigCode','Weight','DateOfScale','ProjectID','Type','UnitPrice','ViewImg'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:ScaleService,private router: Router,
    private toastr:ToastrService,private dialog: MatDialog) {
      this.projectId = '*';
     }

  ngOnInit() {
    this.service.getPigList().then(res => {
      this.service.pigList = new MatTableDataSource(res as Array<any>);
      this.service.pigList.paginator = this.paginator;
      this.service.pigList.sort = this.sort;
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

  getPigScaleByDate(from,to,projectId){
    this.service.getPigListByDate(from,to,projectId).then(res => {
      this.service.pigList = new MatTableDataSource(res as Array<any>);
      this.service.pigList.paginator = this.paginator;
      this.service.pigList.sort = this.sort;
      this.getTotal();
    }); 
  }

  onSubmit(){
    this.getPigScaleByDate(formatDate(this.fromDate,environment.format,environment.locale),formatDate(this.toDate,environment.format,environment.locale),this.projectId);
  }

  getTotal()
  {
    this.weightofPig = this.service.pigList.data.map(t => t.Weight).reduce((acc, value) => acc + value, 0);
    this.numberofPig = this.service.pigList.data.length;
  }

}
