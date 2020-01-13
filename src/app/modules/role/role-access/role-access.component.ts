import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { RoleService } from 'src/app/shared/services/role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.scss']
})
export class RoleAccessComponent implements OnInit {

  displayedColumns: string[] = ['Name','Permit'];
  controllerInfo:any[];
  actionInfo:any[];
  role:any;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  //Tree statement
  public controllerInfo1:any[];
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<any>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
  getLevel = (node: any) => node.level;

  //End tree statement

  constructor(public service: RoleService,private router: Router,
    private toastr: ToastrService) { 
      this.controllerInfo = [];
      this.actionInfo = [];
      this.controllerInfo1 = [];
      this.getCtl();
    }

  ngOnInit() {
    this.service.getRolesList().then(res => {
      this.service.roleList = new MatTableDataSource(res as Array<any>);
      this.service.roleList.paginator = this.paginator;
      this.service.roleList.sort = this.sort;
    })
  }

  //Tree statement
  getCtl(){
    this.service.getTreeList().then((res:any) => {
      console.log(res);
      this.controllerInfo1 = res as any[];
      const TREE_DATA:any[] = this.controllerInfo1;
      this.dataSource.data = TREE_DATA;
    });
  }
  
  /* Get the parent node of a node */
  getParentNode(node: any): any | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  
  onClickNode(node: any):void {
    let parent: any | null = this.getParentNode(node);
    this.service._parentnode = parent.name;
    this.service._childnode = node.name;
    for (var i = 0; i < this.service.roleList.data.length; i++) {
      let jsonconv = JSON.parse(this.service.roleList.data[i].Access);
      this.controllerInfo1 = jsonconv;
      if(this.controllerInfo1 != null){
        let index = this.controllerInfo1.findIndex(x=>x.name == this.service._parentnode);
        if(index >= 0){
          let indexact = this.controllerInfo1[index].children.findIndex(x=>x.name == this.service._childnode);
          if(indexact >= 0){
            this.service.roleList.data[i].Selected = 'A';
          }
          else{
            this.service.roleList.data[i].Selected = 'D';
          }
        }
        else{
          this.service.roleList.data[i].Selected = 'N';
        }
      }
      else{
        this.service.roleList.data[i].Selected = 'N';
      }
    }
    this.service.roleList._updateChangeSubscription();
  }

  //End tree statement

  onChangePermit(event,element){
    this.service.getRoleByID(element.Id).then(res => {
        this.role = res as any;
        let jsonconvert = JSON.parse(this.role.Access);
        this.controllerInfo = jsonconvert;
        if(this.controllerInfo == null){
          this.controllerInfo = [];
        }
        if(event.value != ''){
          if(event.value == 'A'){
            this.onAllow();
          }
          else if(event.value == 'D'){
            this.onDisallow();
          }
          this.service.formModel.value.Id = element.Id;
          this.service.formModel.value.RoleName = element.Name;
          this.service.onPutRoles(this.controllerInfo).then(res => {
            let index = this.service.roleList.data.findIndex(x=>x.Id == element.Id);
            if(index >= 0){
              this.service.roleList.data[index].Access = JSON.stringify(this.controllerInfo);
              this.service.roleList._updateChangeSubscription();
            }
            this.toastr.success("Role updated","Role Access");
          })
        }      
    });

  }

  onAllow(){
      let index = this.controllerInfo.findIndex(x=>x.name == this.service._parentnode);
      if(index <= -1){
        this.actionInfo.push({
          name:this.service._childnode
        });
        this.controllerInfo.push({
          name:this.service._parentnode,
          children:this.actionInfo
        });
        console.log(this.controllerInfo);
      }
      else{
        let indexact = this.controllerInfo[index].children.findIndex(x=>x.name == this.service._childnode);
        if(indexact <= -1){
          this.controllerInfo[index].children.push({
            name:this.service._childnode
          });
          console.log(this.controllerInfo);
        }
      }
  }

  onDisallow(){
    let index = this.controllerInfo.findIndex(x=>x.name == this.service._parentnode);
    if(index >= 0){
      let indexact = this.controllerInfo[index].children.findIndex(x=>x.name == this.service._childnode);
      if(indexact >= 0){
        this.controllerInfo[index].children.splice(indexact,1);
        console.log(this.controllerInfo);
      }
    }
  }

}
