import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private fb:FormBuilder,private shared:SharedService) { 

  }

  getInventory(name:string){
    return this.shared.getDataById("/Inventory/InventoryName/", name);
  }

  getInventoryByID(id:string){
    return this.shared.getDataById("/Inventory/InventoryID/", id);
  }

  getInventoryPrice(inventoryid:string,priceclass:string){
    return this.shared.getDataByTwoParam("/Inventory/InventoryPrice/", inventoryid, priceclass);
  }
}
