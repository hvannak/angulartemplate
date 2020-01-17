import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SaleorderService {

  saleOrderList:MatTableDataSource<any>;
  saleOrderItem:any[];
  constructor(private fb:FormBuilder,private http: HttpClient,private shared:SharedService) { 

  }

  formSaleOrder = this.fb.group({
    SaleOrderID:[''],
    OrderNbr:['',Validators.required],
    CustomerID:['',Validators.required],
    CustomerDescr:['',Validators.required],
    OrderDesc:[''],
    OrderDate:['',Validators.required],
    OrderQty:['',Validators.required],
    OrderTotal:['',Validators.required],
    DeletedSaleOrderDetails:[''],
    IsSyn:['',Validators.required]
  });

  formSaleOrderItem = this.fb.group({
    OrderDetailID:[''],
    SaleOrderID:[''],
    InventoryID:['',Validators.required],
    InventoryDescr:['',Validators.required],
    WarehouseID:['',Validators.required],
    OrderQty:['',Validators.required],
    UnitPrice:[''],
    ExtendedPrice:['']
  });

  getSaleorder(customerId){  
    return this.shared.getDataById("/SaleOrder/Customer/", customerId);
  }

  getSaleorderByID(saleorderId){
    return this.shared.getDataById("/SaleOrder/SaleOrderID/", saleorderId);
  }

  getSaleorderByFilter(customerId,fromdate,todate){
    return this.shared.getDataByThreeParam("/SaleOrder/Filter/", customerId, fromdate,todate);
  }

  getInventory(name:string){
    return this.shared.getDataById("/Inventory/InventoryName/", name);
  }

  getInventoryByID(id:string){
    return this.shared.getDataById("/Inventory/InventoryID/", id);
  }

  postSaleorder(){
    var body = {
      ...this.formSaleOrder.value,
      Details: this.saleOrderItem
    };
    return this.shared.postData(body,'/SaleOrder/Create');
  }

  syncSaleorder(id:number,ordertype:string){
    return this.shared.getDataByTwoParam('/SaleOrder/Sync/', id.toString() ,ordertype);
  }

  putSaleorder(){
    var body = {
      ...this.formSaleOrder.value,
      Details: this.saleOrderItem
    };
    return this.shared.putDataWithoutKey(body, '/SaleOrder/Update');
    // return this.http.put(environment.apiURL + '/SaleOrder/Update', body).toPromise();
  }

  deleteSaleOrder(orderId:number){
    return this.shared.deleteData('/SaleOrder/', orderId.toString());
  }
}
