import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SaleorderItemsComponent } from '../saleorder-items/saleorder-items.component';
import { SaleorderService } from 'src/app/shared/services/saleorder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saleorder',
  templateUrl: './saleorder.component.html',
  styleUrls: ['./saleorder.component.scss']
})
export class SaleorderComponent implements OnInit {

  iscustomer:boolean = true;
  customerList:any[];
  deleteOrderdetail:string;
  priceclass;
  constructor(public service:SaleorderService,private router: Router,
    public customerService:CustomerService,private currentRoute: ActivatedRoute,
    private toastr: ToastrService,private dialog: MatDialog) { 
    this.service.saleOrderItem = [];
    this.deleteOrderdetail = '';
    this.customerList =[];
    this.service.formSaleOrder.reset();
  }

  ngOnInit() {
    // this.customerService.getCustomerBySalepersonID("01AMO1").then(res => {
    //   console.log(res);
    // });

    let saleorderId = this.currentRoute.snapshot.paramMap.get('id');
    if(localStorage.getItem('linkedID') != 'null'){
      this.customerService.getCustomerByID(localStorage.getItem('linkedID')).then((res:any) =>{
        if(res.lenght > 0){
          this.customerList = res;
          this.iscustomer = false;
          this.priceclass = res[0].PriceClassID.value;
        }
      });
    }
    if(saleorderId == null){
      this.service.formSaleOrder.patchValue({
        SaleOrderID: 0,
        IsSyn:false,
        OrderNbr: 'NEW'
      })
    }
    else{
      this.service.getSaleorderByID(saleorderId).then((res:any) => {
        let saleObj = res[0];
        let saleDetailObj = res[0].Details;
        this.customerService.getCustomerByID(saleObj.CustomerID).then((res:any) =>{
          this.customerList = res
          this.priceclass = res[0].PriceClassID.value;
        });
        this.service.formSaleOrder.patchValue({
          SaleOrderID:saleObj.SaleOrderID,
          OrderNbr:saleObj.OrderNbr,
          CustomerID:saleObj.CustomerID,
          CustomerDescr:saleObj.CustomerDescr,
          OrderDesc:saleObj.OrderDesc,
          OrderDate:saleObj.OrderDate,
          OrderQty:saleObj.OrderQty,
          OrderTotal:saleObj.OrderTotal,
          IsSyn:saleObj.IsSyn
        });
        saleDetailObj.forEach(element => {
          this.service.saleOrderItem.push({
          OrderDetailID:element.OrderDetailID,
          SaleOrderID:element.SaleOrderID,
          InventoryID:element.InventoryID,
          InventoryDescr:element.InventoryDescr,
          WarehouseID:element.WarehouseID,
          OrderQty:element.OrderQty,
          UnitPrice:element.UnitPrice,
          ExtendedPrice:element.ExtendedPrice
        })
        });

      })
    }
  }

  AddOrEditSaleItemLine(id){
    let price = this.priceclass;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { id,price };
    this.dialog.open(SaleorderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  onDeleteSaleItemLine(orderLineId:number,i:number){
    if(orderLineId != 0){
      this.deleteOrderdetail += orderLineId + ",";
      this.service.saleOrderItem.splice(i,1);
      this.updateGrandTotal();
    }
  }

  updateGrandTotal(){
    let totalQty = this.service.saleOrderItem.map(t=>t.OrderQty).reduce((prev,value) => prev + parseFloat(value),0);
    let totalAmt = this.service.saleOrderItem.map(t=>t.ExtendedPrice).reduce((prev,value) =>prev + value,0);
    this.service.formSaleOrder.patchValue({
      OrderQty:parseFloat(totalQty).toFixed(4),
      OrderTotal:parseFloat(totalAmt).toFixed(4)
    });
  }

  onSearchCustomer(){
    var data = document.getElementById('customer') as HTMLInputElement; 
    if(data.value != ''){
      if(localStorage.getItem('linkedID') != 'null'){
        this.customerService.getCustomerBySalepersonIDAndCustomer(localStorage.getItem('linkedID'),data.value).then((res:any) =>{
          this.customerList = res.Results
        });
      }
      else{
        this.customerService.getCustomerByName(data.value).then((res:any) =>{
          this.customerList = res
        });
      }
    }
  }

  onChangeCustomer(event){
    let index = this.customerList.findIndex(x=>x.CustomerID.value == event.target.value);
    this.priceclass = this.customerList[index].PriceClassID.value;
    let text = event.target.options[event.target.options.selectedIndex].text;
    this.service.formSaleOrder.patchValue({
      CustomerDescr: text
    })
  }

  onSubmit(){
    let date = formatDate(this.service.formSaleOrder.value.OrderDate,environment.format,environment.locale);
    if(this.service.formSaleOrder.value.SaleOrderID != 0){
      this.service.formSaleOrder.patchValue({
        OrderDate:date,
        DeletedSaleOrderDetails:this.deleteOrderdetail
      });
      this.service.putSaleorder().then(res => {
        this.toastr.info("Your order update sucessfully", "SaleOrder");
        this.router.navigate(['/saleorders']);
      });
    }
    else{
      this.service.formSaleOrder.patchValue({
        OrderDate:date
      });
      this.service.postSaleorder().then(res => {
        this.toastr.info("Your order input sucessfully", "SaleOrder");
        this.router.navigate(['/saleorders']);
      });
    }
  }

}
