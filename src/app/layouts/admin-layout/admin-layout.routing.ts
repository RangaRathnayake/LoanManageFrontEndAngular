import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { UserlistComponent } from 'app/pages/userlist/userlist.component';
import { CalloanComponent } from 'app/pages/calloan/calloan.component';
import { NewapplicationComponent } from 'app/pages/newapplication/newapplication.component';
import { ProploanComponent } from 'app/pages/proploan/proploan.component';
import { ExpenceseComponent } from 'app/pages/expencese/expencese.component';
import { ApplistComponent } from 'app/pages/applist/applist.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'userlist',component:UserlistComponent},
    { path: 'calloan',component:CalloanComponent},
    { path: 'newapplicatin',component:NewapplicationComponent},
    { path: 'proploan',component:ProploanComponent},
    { path: 'expencese',component:ExpenceseComponent},
    { path: 'applist',component:ApplistComponent}
];
