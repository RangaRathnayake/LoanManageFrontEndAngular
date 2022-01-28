import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApicallService } from 'app/service/apicall.service';
import { ActivatedRoute, } from '@angular/router';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  ELEMENT_DATA: any[] = []
  inputval;

  displayedColumns: string[] = ['day', 'total', 'id'];
  dataSource = <any>[];

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private apiCall: ApicallService, private aroute: ActivatedRoute, private router: Router) {
    //this.getallcus();
  }

  ngOnInit(): void {
    this.getallcus();
  }

  serch() {
    // console.log(id);
  }

  getallcus() {
    this.apiCall.get('transaction/getDesc', result => {
      this.ELEMENT_DATA = result;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  more(id) {
    this.apiCall.get('main/getTransaction/' + id, result => {
      window.location.href = "https://rmcinvesment.com/0LoanPrint/index.html?data=" + JSON.stringify(result);
    });
  }
}



