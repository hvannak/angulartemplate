import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SaleorderService } from 'src/app/shared/services/saleorder.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-saleorders',
  templateUrl: './saleorders.component.html',
  styleUrls: ['./saleorders.component.scss']
})
export class SaleordersComponent implements OnInit {

  customerId;
  fromdate;
  todate;
  customerrest;
  isSearch:boolean = true;
  displayedColumns: string[] = ['OrderNbr','CustomerID','CustomerDescr','OrderDate','Description','OrderQty','OrderTotal','Edit','Delete','Sync'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:SaleorderService,private router: Router,private toastr: ToastrService,private customerService:CustomerService ) { }

  ngOnInit() {
    if(localStorage.getItem('linkedID') != 'null'){
      this.customerId = localStorage.getItem('linkedID');
      this.getSaleorder(localStorage.getItem('linkedID'));
      this.isSearch = false;
      if (this.columnsToDisplay.length) {
        this.columnsToDisplay.pop();
      }
    }
    else{
      this.getSaleorder('*');
    }  
  }

  onSearchCustomer(){
    var data = document.getElementById('customerId') as HTMLInputElement; 
    if(data.value != ''){
      this.customerService.getCustomerByName(data.value).then((res:any) =>{
        this.customerrest = res
      });
    }
  }

  onSaleOrderSync(element){
    console.log(element.IsSyn);
    if(element.IsSyn == false){
      var typeId = document.getElementById('typeId') as HTMLInputElement;
      if(typeId.value != ''){
        this.service.syncSaleorder(element.SaleOrderID,typeId.value).then(res =>{
          if(res != null){
            let index = this.service.saleOrderList.data.findIndex(x=>x.SaleOrderID == element.SaleOrderID);
            this.service.saleOrderList.data[index].IsSyn = true;
            this.service.saleOrderList._updateChangeSubscription();
            this.toastr.info(element.OrderNbr + " Sync Successfully", "SaleOrder Sync.");
          }
        });
      }
    }
    else{
      this.toastr.warning(element.OrderNbr + " cannot sync", "SaleOrder Sync.");
    }
  }

  getSaleorder(customerId){
    this.service.getSaleorder(customerId).then((res:any) => {
      this.service.saleOrderList = new MatTableDataSource(res as Array<any>);
      this.service.saleOrderList.paginator = this.paginator;
      this.service.saleOrderList.sort = this.sort;
    });
  }

  getSaleorderByFilter(customerId,fromdate,todate){
    this.service.getSaleorderByFilter(customerId,fromdate,todate).then((res:any) =>{
      this.service.saleOrderList = new MatTableDataSource(res as Array<any>);
      this.service.saleOrderList.paginator = this.paginator;
      this.service.saleOrderList.sort = this.sort;
    })
  }

  openForEdit(orderId: number,issyn:boolean) {
    if(issyn == false){
      this.router.navigate(['/saleorder/edit/' + orderId]);
    }
    else{
      this.toastr.warning("Your order cannot edit", "SaleOrder");
    }
  }

  deleteSaleOrder(orderId:number,issyn:boolean){
    if(issyn == false){
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteSaleOrder(orderId).then(res => {
          let index = this.service.saleOrderList.data.findIndex(x=>x.SaleOrderID == orderId);
          this.service.saleOrderList.data.splice(index,1);
          this.service.saleOrderList._updateChangeSubscription();
          this.toastr.warning("Deleted Successfully", "SaleOrder");
        });
      }
    }
    else{
      this.toastr.warning("Your order cannot delete", "SaleOrder");
    }
  }

  onSubmit(){
    this.getSaleorderByFilter(this.customerId,formatDate(this.fromdate,environment.format,environment.locale),formatDate(this.todate,environment.format,environment.locale));
  }

}
