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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/modules/user/register/register.component';
import { CompanyinfoComponent } from 'src/app/modules/companyinfo/companyinfo.component';
import { RoleComponent } from 'src/app/modules/role/role/role.component';
import { RoleAccessComponent } from 'src/app/modules/role/role-access/role-access.component';
import { UserAccessComponent } from 'src/app/modules/user/user-access/user-access.component';
import { UserEditComponent } from 'src/app/modules/user/user-edit/user-edit.component';
import { ForbiddenComponent } from 'src/app/modules/error/forbidden/forbidden.component';
import { BroilerscaleComponent } from 'src/app/modules/broilerscale/broilerscale.component';
import { ImagedisplayComponent } from 'src/app/modules/imagedisplay/imagedisplay.component';
import { PigscaleComponent } from 'src/app/modules/pigscale/pigscale.component';
import { TruckscaleComponent } from 'src/app/modules/truckscale/truckscale.component';
import { PrivacyComponent } from 'src/app/modules/privacy/privacy/privacy.component';
import { PrivacyViewComponent } from 'src/app/modules/privacy/privacy-view/privacy-view.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CustomeroutstandingComponent } from 'src/app/modules/customeroutstanding/customeroutstanding.component';
import { CustomerpaymentComponent } from 'src/app/modules/customerpayment/customerpayment.component';
import { TakeleaveComponent } from 'src/app/modules/takeleave/takeleave.component';

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
    UserEditComponent,
    ForbiddenComponent,
    BroilerscaleComponent,
    ImagedisplayComponent,
    PigscaleComponent,
    TruckscaleComponent,
    PrivacyComponent,
    PrivacyViewComponent,
    CustomeroutstandingComponent,
    CustomerpaymentComponent,
    TakeleaveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorModule
  ],
  entryComponents:[UserEditComponent,ImagedisplayComponent]
})
export class DefaultModule { }
