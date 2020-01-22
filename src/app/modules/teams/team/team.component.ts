import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TeamMembersComponent } from '../team-members/team-members.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  deleteTeammember:string;
  constructor(public service:TeamsService,private router: Router,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,private dialog: MatDialog) {
      this.service.teamMembers = [];
      this.deleteTeammember = '';
      this.service.formTeam.reset();
     }

  ngOnInit() {
    let teamId = this.currentRoute.snapshot.paramMap.get('id');
    if(teamId == null){
      this.service.formTeam.patchValue({
        TeamID:0,
        DeletedTeamMembers:''
      });
    }
    else {
      this.service.getTeamByID(teamId).then((res:any) => {
        this.service.formTeam.patchValue({
          TeamID:res.TeamID,
          TeamName:res.TeamName,
          DeletedTeamMembers:''
        });
        res.teamMembers.forEach(element => {
          this.service.teamMembers.push({
            TeamMemberID:element.TeamMemberID,
            TeamID:element.TeamID,
            UserID:element.UserID,
            FullName:element.FullName
        })
        });

      })
    }
  }

  AddOrEditTeammember(index){
    console.log(index);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    dialogConfig.data = { index };
    this.dialog.open(TeamMembersComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log('done');
    });
  }

  onDeleteTeammember(teammemberId:number,i:number){
    if(teammemberId != 0){
      this.deleteTeammember += teammemberId + ",";
      this.service.teamMembers.splice(i,1);
    }
    else {
      this.service.teamMembers.splice(i,1);
    }
  }

  onSubmit(){
    if(this.service.formTeam.value.TeamID != 0){
      this.service.formTeam.patchValue({
        DeletedTeamMembers:this.deleteTeammember
      });
      this.service.putTeam().then(res => {
        this.toastr.info("Your team update sucessfully", "Team");
        this.router.navigate(['/teams']);
      });
    }
    else{
      this.service.postTeam().then(res => {
        this.toastr.info("Your team input sucessfully", "Team");
        this.router.navigate(['/teams']);
      });
    }
  }

}
