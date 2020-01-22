import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  displayedColumns: string[] = ['TeamName','Edit','Delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(public service:TeamsService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam() {
    this.service.getTeam().then((res: any) => {
      this.service.teamsList = new MatTableDataSource(res as Array<any>);
      this.service.teamsList.paginator = this.paginator;
      this.service.teamsList.sort = this.sort;
    });
  }

  openForEdit(teamId: number) {
      this.router.navigate(['/team/edit/' + teamId]);
  }

  deleteTeam(teamId: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTeam(teamId).then(res => {
        let index = this.service.teamsList.data.findIndex(x => x.SaleOrderID == teamId);
        this.service.teamsList.data.splice(index, 1);
        this.service.teamsList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Team");
      });
    }
  }
}
