import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { RolesautherizedComponent } from './modules/rolesautherized/rolesautherized.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';


const routes: Routes = [{
  path:'',
  component:DefaultComponent,
  children: [{
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'autherize',
    component: RolesautherizedComponent
  }]
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent,
  canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
