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
  mob;
  email;

  userid;

  ifvisivle: boolean = true;
  addnew: boolean = true;
  enabaledeactine:boolean=false;

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
    this.ifvisivle = true;
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
    if (this.addnew) {
      if (this.category && this.username && this.pass && this.repass && (this.pass == this.repass)) {
        this.apiCall.post('user/reg', {
          user: {
            name: this.username,
            email: this.email,
            passowrd: this.pass,
            utype: this.category,
            mobile: this.mob
          }
        }, data => {
          this.username = "";
          this.pass = "";
          this.repass = "";
          this.category = "";
          this.email = "";
          this.mob = "";
          this.alart.showNotification('success', 'save');
          this.getusetlist();
        })
      } else {
        this.alart.showNotification('warning', 'check feilds');
      }
    } else {
      if (this.category && this.username && this.mob && this.email) {
        this.apiCall.post('user/reg', {
          user: {
            id: this.userid,
            name: this.username,
            email: this.email,
            utype: this.category,
            mobile: this.mob
          }
        }, data => {
          console.log(data);
          this.username = "";
          this.category = "";
          this.email = "";
          this.mob = "";
          this.alart.showNotification('success', 'save');
          this.getusetlist();
        })
      } else {
        this.alart.showNotification('warning', 'check feilds');
      }
    }
  }


  getusetlist() {
    this.apiCall.get('user/get', result => {
      this.userlist = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

  clear(){
    this.username = "";
    this.pass = "";
    this.repass = "";
    this.category = "";
    this.email = "";
    this.mob = "";
  }

  deactine(){
    this.apiCall.post('user/reg', {
      user: {
        id: this.userid,
        status:3
      }
    }, data => {
      console.log(data);
      this.username = "";
      this.category = "";
      this.email = "";
      this.mob = "";
      this.alart.showNotification('success', 'deactive success');
      this.enabaledeactine=false;
      this.getusetlist();
    })
  }

  getuserdata(id) {
    this.apiCall.get('user/' + id, result => {
      this.username = result.name;
      this.mob = result.mobile,
        this.email = result.email

      console.log(result);
      this.ifvisivle = false;
      this.addnew = false;
      this.enabaledeactine=true;
      this.userid = id;

      // if(id ==  this.user.id){
      //   this.username= result.name;
      //   this.pass
      // }else{
      //   this.username= result.name;
      // }

    })

  }

}
