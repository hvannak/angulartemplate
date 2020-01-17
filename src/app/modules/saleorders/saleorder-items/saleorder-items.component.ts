import { Component, OnInit, Inject } from '@angular/core';
import { SaleorderService } from 'src/app/shared/services/saleorder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryService } from 'src/app/shared/services/inventory.service';

@Component({
  selector: 'app-saleorder-items',
  templateUrl: './saleorder-items.component.html',
  styleUrls: ['./saleorder-items.component.scss']
})
export class SaleorderItemsComponent implements OnInit {

  inventoryList:any[];
  constructor(public service:SaleorderService,private inventoryService:InventoryService,@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<SaleorderItemsComponent>) {
    this.inventoryList = [];
   }

  ngOnInit() {
    if(this.data.id == null){
      this.service.formSaleOrderItem.reset();
      this.service.formSaleOrderItem.patchValue({
        OrderDetailID: 0,
        SaleOrderID: 0
      })
    }
    else{
      let index = this.service.saleOrderItem.findIndex(x=>x.OrderDetailID == this.data.id);
      let formval = this.service.saleOrderItem[index];
      this.service.getInventoryByID(formval.InventoryID).then((res:any) =>{
        this.inventoryList = res
        console.log(res);
      });
      this.service.formSaleOrderItem.setValue({
        OrderDetailID:formval.OrderDetailID,
        SaleOrderID:formval.SaleOrderID,
        InventoryID:formval.InventoryID,
        InventoryDescr:formval.InventoryDescr,
        WarehouseID:formval.WarehouseID,
        OrderQty:formval.OrderQty,
        UnitPrice:formval.UnitPrice,
        ExtendedPrice:formval.ExtendedPrice
      })
    }
  }

  onSearchInventory(){
    var data = document.getElementById('inventory') as HTMLInputElement; 
    if(data.value != ''){
      this.service.getInventory(data.value).then((res:any) =>{
        this.inventoryList = res
        console.log(res);
      });
    }
  }

  onChangeInventory(event){
    let text = event.target.options[event.target.options.selectedIndex].text;
    let inventoryId = event.target.value;
    let index = this.inventoryList.findIndex(x=>x.InventoryID.value == inventoryId);
    let defaultSite = this.inventoryList[index].DefaultWarehouseID.value;
    if(defaultSite == undefined){
      defaultSite = 'M000'
    }

    this.inventoryService.getInventoryPrice(inventoryId,this.data.price).then((res:any) =>{
      let price = 0;
      if(res.SalesPriceDetails.length > 0){
        price = res.SalesPriceDetails[0].Price.value
      }
      this.service.formSaleOrderItem.patchValue({
        InventoryDescr:text,
        UnitPrice:price,
        WarehouseID:defaultSite
      });
    })
  }

  onOrderQtyChange(){
    if(this.service.formSaleOrderItem.value.UnitPrice != null){
      let extamount = parseFloat((this.service.formSaleOrderItem.value.UnitPrice * this.service.formSaleOrderItem.value.OrderQty).toFixed(4));
      this.service.formSaleOrderItem.patchValue({
        ExtendedPrice:extamount
      });
    }
  }

  onSubmit(){
    if(this.service.formSaleOrderItem.value.OrderDetailID != 0){
      let index = this.service.saleOrderItem.findIndex(x=>x.OrderDetailID == this.data.id);
      this.service.saleOrderItem[index] = this.service.formSaleOrderItem.value;
    }
    else{
      this.service.saleOrderItem.push(this.service.formSaleOrderItem.value);
    }
    this.dialogRef.close();
  }

}
