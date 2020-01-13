import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { CompanyinfoComponent } from './modules/companyinfo/companyinfo.component';
import { RoleComponent } from './modules/role/role/role.component';
import { RoleAccessComponent } from './modules/role/role-access/role-access.component';
import { UserAccessComponent } from './modules/user/user-access/user-access.component';


const routes: Routes = [{
  path:'',
  component:DefaultComponent,
  canActivate:[AuthGuard],
  children: [{
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'role',
    component:RoleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'autherize',
    component:RoleAccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'user',
    component:UserAccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate:[AuthGuard]
  }]
},
{
  path:'companyinfo',
  component:CompanyinfoComponent
},
{
  path:'login',
  component:LoginComponent,
  canActivate:[AuthGuard]
},
{
  path:'register',
  component:RegisterComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
