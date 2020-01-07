import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule, MatSidenavModule } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';
import { RolesautherizedComponent } from 'src/app/modules/rolesautherized/rolesautherized.component';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/modules/user/register/register.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    RolesautherizedComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
