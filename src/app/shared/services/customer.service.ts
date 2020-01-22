import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  outstandingResults:MatTableDataSource<any>;
  paymentResults:MatTableDataSource<any>;
  constructor(public service:SharedService) { 

  }

  getCustomerByName(name:string){
    return this.service.getDataById('/Customer/CustomerName/', name);
  }

  getCustomerByID(id:string){
    return this.service.getDataById('/Customer/CustomerID/', id);
  }

  getCustomerBySalepersonIDAndCustomer(saleid:string,custid:string){
    return this.service.getDataByTwoParam('/Customer/SalespersonID/', saleid, custid);
  }

  getCustomerBySalepersonID(saleid:string){
    return this.service.getDataById('/Customer/SalespersonID/', saleid);
  }

  getCustomerOutstandingList(id:string){
    return this.service.getDataById('/CustomerOutstanding/CustomerID/', id);
  }
  
  getCustomerPaymentList(id:string,fromdate:Date,todate:Date){
    return this.service.getDataByThreeParam('/CustomerPayment/CustomerID/', id, fromdate.toString(), todate.toString());
  }
  
}
