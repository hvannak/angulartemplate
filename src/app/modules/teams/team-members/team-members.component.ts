import { Component, OnInit, Inject } from '@angular/core';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  userList:any[];
  constructor(public service:TeamsService,private serviceUser:UserService,@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<TeamMembersComponent>) {
    this.userList =[];
   }

  ngOnInit() {
    this.serviceUser.getUsers().then((res:any) => {
      this.userList = res;
    });
    if(this.data.index == null){
      this.service.formTeamMember.reset();
      this.service.formTeamMember.patchValue({
        TeamMemberID: 0,
        TeamID: 0
      })
    }
    else{
      let formval = this.service.teamMembers[this.data.index];
      this.service.formTeamMember.setValue({
        TeamMemberID:formval.TeamMemberID,
        TeamID:formval.TeamID,
        UserID:formval.UserID,
        FullName:formval.FullName
      })
    }
  }

  onChangeUser(event){
    let fullname = event.target.options[event.target.options.selectedIndex].text;
    this.service.formTeamMember.patchValue({
      FullName:fullname
    });
  }

  onSearchUser(){
    var data = document.getElementById('fname') as HTMLInputElement; 
    if(data.value != ''){
      this.serviceUser.getUsersByFullname(data.value).then((res:any) => {
        this.userList = res;
        console.log(res);
      })
    }
  }

  onSubmit(){
    if(this.service.formTeamMember.value.TeamMemberID != 0){
      let index = this.data.index;

      console.log(this.service.formTeamMember.value);
      this.service.teamMembers[index] = this.service.formTeamMember.value;
    }
    else{
      this.service.teamMembers.push(this.service.formTeamMember.value);
    }
    this.dialogRef.close();
  }

}
