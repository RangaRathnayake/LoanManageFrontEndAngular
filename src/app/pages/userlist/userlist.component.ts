import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  category;
  categorylist;

  username;
  pass;
  repass;
  user;
  userlist;

  userdata;

  displayedColumns: string[] = ['name', 'utype.name', 'id'];
  dataSource = <any>[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // @ViewChild(MatPaginator, { static: false }) paginatorpen: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortpen: MatSort;


  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getusercat();
    this.getusetlist();
    this.user = this.apiCall.logedUser();
  }

  loadsubcat() {

  }

  getusercat() {
    this.apiCall.get('user/utype', result => {
      this.categorylist = result;
      console.log("xxxxxxxxx");
      console.log(this.categorylist);
      console.log("xxxxxxxxx");
    })

  }

  save() {
    if (this.category && this.username && this.pass && this.repass && (this.pass == this.repass)) {
      this.apiCall.post('user/reg', {
        user: {
          name: this.username,
          email: "string;",
          passowrd: this.pass,
          utype: this.category
        }
      }, data => {
        console.log(data);
        this.username = "";
        this.pass = "";
        this.repass = "";
        this.category = "";
        this.alart.showNotification('success', 'save');
      })
    } else {
      this.alart.showNotification('warning', 'check feilds');
    }
  }


  getusetlist() {
    this.apiCall.get('user', result => {
      this.userlist = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

  getuserdata(id) {
    this.apiCall.get('user/' + id, result => {
      if(id ==  this.user.id){
        console.log("okk");
      }
      this.username= result.name;

    })

  }

}
