import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menuItems;
  constructor(private apiCall: ApicallService) { }

  ngOnInit() {
    this.getPrivilages();
  }

  getPrivilages() {

    const user = this.apiCall.logedUser();
    if (user) {
      const ar = [];
      this.apiCall.get('user/privilage/' + user.utype.id, (data) => {
        data.privilages.forEach(element => {
          const obj = { path: element.link, title: element.string, icon: element.icon, class: '' };
          ar.push(obj);
          this.menuItems = ar;
          console.log(this.menuItems);
        });
      })
    }

  }

}
