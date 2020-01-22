import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GpsinfoComponent } from './gpsinfo/gpsinfo.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GpsmanualComponent } from './gpsmanual/gpsmanual.component';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { GpstrackingService } from 'src/app/shared/services/gpstracking.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-gpstracking',
  templateUrl: './gpstracking.component.html',
  styleUrls: ['./gpstracking.component.scss']
})
export class GpstrackingComponent implements OnInit {

  public lat = 11.559141;
  public lng = 104.873510;
  public origin: any
  public destination: any
  initDestination: boolean = false;
  fromDate:Date;
  toDate:Date;
  userId:string;
  userList;
  teamList;
  teamID;
  customerList:any[];
  constructor(private dialog: MatDialog,public service:GpstrackingService,private serviceTeam:TeamsService,private serviceCustomer:CustomerService,
    public userService:UserService,private roleService:RoleService,private toastr: ToastrService) { }

  ngOnInit() {
    this.service.gpsTrackingList =[];
    this.customerList = [];
    this.getTeam();
  }

  onSubmit(){
    this.getGpstrackingByDate(formatDate(this.fromDate,environment.format,environment.locale),formatDate(this.toDate,environment.format,environment.locale),this.userId);
  }

  getGpstrackingByDate(from,to,userId){
    this.service.getGpstrackingByDate(from,to,userId).then(res =>{
      this.service.gpsTrackingList = res as Array<any>
    });
  }

  getTeam(){
    this.serviceTeam.getTeam().then((res:any) => {
      this.teamList = res;
    });
  }

  getTeamUser(teamId) {
    this.serviceTeam.getTeamUser(teamId).then((res:any) => {
      this.userList = res;
    })
  }


  onChangeTeam(event) {
    this.getTeamUser(this.teamID);
  }

  onChangeUser(event){
    if(this.customerList.length > 0){
      this.customerList = [];
    }
    let index = this.userList.findIndex(x=>x.Id == event.value);
    if(this.userList[index].LinkedCustomerID != null) {
        this.serviceCustomer.getCustomerBySalepersonID(this.userList[index].LinkedCustomerID).then((res:any) => {
          this.customerList = res.Results;
        });
    }
  }

  showRouting(gpsId){
    let index = this.service.gpsTrackingList.findIndex(x=>x.GpsID == gpsId);
    this.initDestination = true;
    if(index == 0){
      this.lat = this.service.gpsTrackingList[index].Lat;
      this.lng = this.service.gpsTrackingList[index].Lng;
      this.origin = { lat: parseFloat(this.lat.toString()) , lng: parseFloat(this.lng.toString()) }
      this.destination = { lat: parseFloat(this.lat.toString()), lng: parseFloat(this.lng.toString()) }
    }
    else{   
      let orginLat = this.service.gpsTrackingList[index-1].Lat.toString();
      let orginLng = this.service.gpsTrackingList[index-1].Lng.toString();
      let destLat = this.service.gpsTrackingList[index].Lat.toString();
      let destLng = this.service.gpsTrackingList[index].Lng.toString();
      this.origin = { lat: parseFloat(orginLat) , lng: parseFloat(orginLng) }
      this.destination = { lat: parseFloat(destLat), lng: parseFloat(destLng) }
    }
  }

  gpsManual(gpsId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { gpsId };
    this.dialog.open(GpsmanualComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log('done');
    });
  }

  gpsInfo(gps){
    let index = this.service.gpsTrackingList.findIndex(x=>x.GpsID == gps.GpsID);
    let orginpoint;
    if(index > 0){
      orginpoint = this.service.gpsTrackingList[index-1];
    }
    else{
      orginpoint = gps;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "100%";
    dialogConfig.data = { gps,orginpoint };
    this.dialog.open(GpsinfoComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log('done');
    });
  }
  
  getGpsTracking(){
    this.service.getGpsList().then(res =>{
      this.service.gpsTrackingList = res as Array<any>
    });
  }

  getUserList(){
    this.userService.getUsers().then(res => {
      this.userList = res;
    })
  }

  getUserListById(id){
    this.userService.getUserById(id).then(res => {
      this.userList = res;
    })
  }

  deleteGpsTracking(gpsId){
    if (confirm('Are you sure to delete this record?')) {
    this.service.deleteGpstracking(gpsId).then(res =>{
      let index = this.service.gpsTrackingList.findIndex(x=>x.GpsID == gpsId);
      this.service.gpsTrackingList.splice(index,1);
      this.toastr.info("Delete data is sucessfully.","GPS Data");
      })
    }
  }

}
