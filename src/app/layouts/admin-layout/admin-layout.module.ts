import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from 'app/pages/users/users.component';
import { UserlistComponent } from 'app/pages/userlist/userlist.component';
import { CalloanComponent } from 'app/pages/calloan/calloan.component';
import { NewapplicationComponent } from 'app/pages/newapplication/newapplication.component';
import { ProploanComponent } from 'app/pages/proploan/proploan.component';
import { MoreinfoComponent } from 'app/pages/moreinfo/moreinfo.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ExpenceseComponent } from '../../pages/expencese/expencese.component';
import { ApplistComponent } from 'app/pages/applist/applist.component';
import { SystemComponent } from '../../pages/system/system.component';
import { FulldetailsComponent } from 'app/pages/fulldetails/fulldetails.component';
import { SystemsettingsComponent } from 'app/pages/systemsettings/systemsettings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UsersComponent,
    UserlistComponent,
    CalloanComponent,
    NewapplicationComponent,
    ProploanComponent,
    MoreinfoComponent,
    FulldetailsComponent,
    SystemsettingsComponent,
    ExpenceseComponent,
    ApplistComponent,
    SystemComponent
  ]
})

export class AdminLayoutModule { }
