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
import { ForbiddenComponent } from './modules/error/forbidden/forbidden.component';
import { BroilerscaleComponent } from './modules/broilerscale/broilerscale.component';
import { PigscaleComponent } from './modules/pigscale/pigscale.component';
import { TruckscaleComponent } from './modules/truckscale/truckscale.component';
import { PrivacyComponent } from './modules/privacy/privacy/privacy.component';
import { PrivacyViewComponent } from './modules/privacy/privacy-view/privacy-view.component';
import { CustomeroutstandingComponent } from './modules/customeroutstanding/customeroutstanding.component';
import { CustomerpaymentComponent } from './modules/customerpayment/customerpayment.component';
import { TakeleaveComponent } from './modules/takeleave/takeleave.component';
import { SaleordersComponent } from './modules/saleorders/saleorders.component';
import { SaleorderComponent } from './modules/saleorders/saleorder/saleorder.component';
import { GpstrackingComponent } from './modules/gpstracking/gpstracking.component';
import { TeamsComponent } from './modules/teams/teams.component';
import { TeamComponent } from './modules/teams/team/team.component';
import { MenuRootComponent } from './modules/menus/menu-root/menu-root.component';
import { MenuAppComponent } from './modules/menus/menu-app/menu-app.component';
import { MenuUserComponent } from './modules/menus/menu-user/menu-user.component';


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
    path:'register',
    component:RegisterComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'forbidden',
    component:ForbiddenComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'broiler',
    component:BroilerscaleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'pig',
    component:PigscaleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'truck',
    component:TruckscaleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'privacies',
    component:PrivacyComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'outstanding',
    component:CustomeroutstandingComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'payment',
    component:CustomerpaymentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'leave',
    component:TakeleaveComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'saleorders',
    component:SaleordersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'saleorder',
    component:SaleorderComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'saleorder/edit/:id',
    component:SaleorderComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'teams',
    component:TeamsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'team',
    component:TeamComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'team/edit/:id',
    component:TeamComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'gpstracking',
    component: GpstrackingComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'menuroot',
    component: MenuRootComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'menuapp',
    component: MenuAppComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'menuuser',
    component: MenuUserComponent,
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
  path: 'viewprivacy/privacy/:name',
  component:PrivacyViewComponent
},
{
  path:'login',
  component:LoginComponent,
  canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
