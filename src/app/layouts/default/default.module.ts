import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule, MatSidenavModule } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/modules/user/register/register.component';
import { CompanyinfoComponent } from 'src/app/modules/companyinfo/companyinfo.component';
import { RoleComponent } from 'src/app/modules/role/role/role.component';
import { RoleAccessComponent } from 'src/app/modules/role/role-access/role-access.component';
import { UserAccessComponent } from 'src/app/modules/user/user-access/user-access.component';
import { UserEditComponent } from 'src/app/modules/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    CompanyinfoComponent,
    RoleComponent,
    RoleAccessComponent,
    UserAccessComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents:[UserEditComponent]
})
export class DefaultModule { }
