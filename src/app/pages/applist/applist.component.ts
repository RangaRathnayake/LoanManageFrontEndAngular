import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApicallService } from 'app/service/apicall.service';
import { ActivatedRoute, } from '@angular/router';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.scss']
})

//ELEMENT_DATA: any=[];

export class ApplistComponent implements OnInit {

  ELEMENT_DATA: any[] = []
  inputval;

  displayedColumns: string[] = ['oderNumber', 'Name', 'nic', 'mobile', 'id'];
  dataSource = <any>[];

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private apiCall: ApicallService, private aroute: ActivatedRoute, private router: Router) {
    this.getallcus();
  }

  ngOnInit(): void {
    this.getallcus();
  }

  serch() {
    // console.log(id);
  }

  getallcus() {
    this.apiCall.get('main/withCus', result => {

      result.forEach(element => {
        var obj = {
          oderNumber: element.oderNumber,
          Name: element.customer.name,
          nic: element.customer.nic,
          mobile: element.customer.mobile,
          id: element.id
        }
        console.log(obj);
        this.ELEMENT_DATA.push(obj);
      });


      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  more(id) {
    this.router.navigate(['fulldetails', id]);
  }

}
