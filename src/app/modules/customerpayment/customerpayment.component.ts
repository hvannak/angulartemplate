import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customerpayment',
  templateUrl: './customerpayment.component.html',
  styleUrls: ['./customerpayment.component.scss']
})
export class CustomerpaymentComponent implements OnInit {

  customerId;
  fromdate;
  todate;
  customerrest;
  isSearch:boolean = true;
  displayedColumns: string[] = ['Customer','DocType','Date','Phone1','ReferenceNbr','PaymentAmount'];
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  paymentList:any[];
  constructor(public service:CustomerService) {
    this.paymentList =[];
   }

  ngOnInit() {
    if(localStorage.getItem('linkedID') != 'null'){
      this.isSearch = false;
      this.customerId = localStorage.getItem('linkedID');
    }
  }

  onSubmit(){
    this.getCustomerPayment(this.customerId,formatDate(this.fromdate,environment.format,environment.locale),formatDate(this.todate,environment.format,environment.locale));
  }

  getCustomerPayment(customerId,fromdate,todate){
    this.service.getCustomerPaymentList(customerId,fromdate,todate).then((res:any) =>{
      this.paymentList = res.Results;
      this.service.paymentResults = new MatTableDataSource(res.Results as Array<any>);
      this.service.paymentResults.paginator = this.paginator;
      this.service.paymentResults.sort = this.sort;
    })
  }

  getCustomerTotalPayment(){
    let total = this.paymentList.map(t => t.PaymentAmount.value).reduce((acc ,value) => acc + value,0);
    return total;
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
