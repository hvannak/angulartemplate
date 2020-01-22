import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamsList:MatTableDataSource<any>;
  teamMembers:any[];
  constructor(private shared:SharedService,private fb:FormBuilder) { }

  formTeam = this.fb.group({
    TeamID:[''],
    TeamName:['',Validators.required],
    DeletedTeamMembers:['']
  });

  formTeamMember = this.fb.group({
    TeamMemberID:[''],
    TeamID:[''],
    UserID:['',Validators.required],
    FullName:['',Validators.required]
  });

  getTeam(){
    return this.shared.getAllData("/Teams");
  }

  getTeamByID(teamId){
    return this.shared.getDataById("Teams", teamId);
  }

  getTeamUser(teamId){
    return this.shared.getDataById("Teams/TeamUser", teamId);
  }

  postTeam(){
    var body = {
      ...this.formTeam.value,
      teamMembers: this.teamMembers
    };
    return this.shared.postData(body,'/Teams');
  }

  putTeam(){
    var body = {
      ...this.formTeam.value,
      teamMembers: this.teamMembers
    };
    console.log(body);
    return this.shared.putDataWithoutKey(body, '/Teams');
  }

  deleteTeam(teamId:number){
    return this.shared.deleteData('/Teams/', teamId.toString());
  }
  
}
