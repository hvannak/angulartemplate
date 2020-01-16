import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customeroutstanding',
  templateUrl: './customeroutstanding.component.html',
  styleUrls: ['./customeroutstanding.component.scss']
})
export class CustomeroutstandingComponent implements OnInit {

  totalOutstanding;
  customerId;
  customerrest;
  isSearch:boolean = true;
  displayedColumns: string[] = ['Customer','Date','TypeDocType','ReferenceNbr','Currency','Balance'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:CustomerService ) { 

  }

  ngOnInit() {
    console.log(localStorage.getItem('linkedID'));
    if(localStorage.getItem('linkedID') != 'null'){
      this.isSearch = false;
      this.getCustomerOutstandingList(localStorage.getItem('linkedID'));
    }
  }

  onSubmit(){
    this.getCustomerOutstandingList(this.customerId);
    // this.service.getCustomerOutstandingList(this.customerId).then((res:any) =>{
    //   this.service.outstandingResults = new MatTableDataSource(res.Results as Array<any>);
    //   this.service.outstandingResults.paginator = this.paginator;
    //   this.service.outstandingResults.sort = this.sort;
    //   this.totalOutstanding = res.BalancebyDocuments.value;
    // })
  }

  getCustomerOutstandingList(customerId){
    this.service.getCustomerOutstandingList(customerId).then((res:any) =>{
      this.service.outstandingResults = new MatTableDataSource(res.Results as Array<any>);
      this.service.outstandingResults.paginator = this.paginator;
      this.service.outstandingResults.sort = this.sort;
      this.totalOutstanding = res.BalancebyDocuments.value;
    })
  }

  onSearchCustomer(){
    var data = document.getElementById('customer') as HTMLInputElement; 
    if(data.value != ''){
      this.service.getCustomerByName(data.value).then((res:any) =>{
        this.customerrest = res;
      });
    }
  }

}
