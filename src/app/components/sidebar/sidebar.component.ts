import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/users', title: 'Users',  icon:'notifications', class: '' },
  // { path: '/userlist', title: 'Users', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private apiCall: ApicallService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getPrivilages();
  }

  getPrivilages() {

    const user = this.apiCall.logedUser();
    if (user) {
      const ar = [];
      this.apiCall.get('user/privilage/' + user.utype.id, (data) => {
        console.log(data);
        data.privilages.forEach(element => {
          const obj = { path: element.link, title: element.string, icon: element.icon, class: '' };
          console.log(obj);
          ar.push(obj);
          ROUTES = ar;
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        });
      })
    } 

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
