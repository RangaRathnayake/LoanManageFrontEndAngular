import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-histry',
  templateUrl: './histry.component.html',
  styleUrls: ['./histry.component.scss'],
})
export class HistryComponent implements OnInit {
  mainId;
  transactionData;

  warrant = 0.0;
  iArr = 0.0;
  cArr = 0.0;
  interest = 0.0;
  capita = 0.0;

  totCap = 0.0;
  totInterest = 0.0;

  nonRefund = 0.0;
  advance = 0.0;
  doc = 0.0;
  other = 0.0;
  over = 0.0;
  total = 0.0;

  arrearsData;
  arrears = 0.0;
  war = 0.0;
  totalCapital = 0.0;
  totalInterest = 0.0;

  totalHaveToPay;

  ELEMENT_DATA: any[] = [];
  inputval;

  displayedColumns: string[] = ['id', 'day', 'warant', 'interest', 'capital', 'nonRefund', 'advance', 'dockCharge', 'otherPay', 'over', 'total'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private arout: ActivatedRoute,
    private apiCall: ApicallService,
    private alart: AlartService
  ) { }

  ngOnInit(): void {
    this.arout.params.subscribe((params) => {
      const id = params['id'];
      this.mainId = id;
      if (id) {
        this.getTransactionData(id);
        this.getArrears(id);
      } else {
      }
    });
  }

  getTransactionData(id) {
    this.apiCall.get('transaction/main/' + id, (result) => {
      if (result.length > 0) {
        this.transactionData = result;

        this.ELEMENT_DATA = this.transactionData;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calTotals();
      } else {
        console.log('empty');
      }
    });
  }

  getArrears(id) {
    console.log(id);
    this.apiCall.get('arrears/pending/' + id, (data) => {
      this.arrearsData = data;

      this.arrearsData.forEach((element) => {
        this.totalCapital += Number(element.capital);
        this.totalInterest += Number(element.interest);

        console.log("*********** " + this.totalCapital);

        if (element.status == 2) {
          this.arrears +=
            Number(element.capitalArrears) + Number(element.interestArrears);
          this.war += Number(element.warrant);
          this.totalHaveToPay +=
            Number(element.capitalArrears) +
            Number(element.interestArrears) +
            Number(element.warrant);
        }

      });


    });
  }

  callTwo(x: number, y: number): Number {
    return Number(x) + Number(y);
  }

  async calTotals() {

    this.warrant = 0.0;
    this.iArr = 0.0;
    this.cArr = 0.0;
    this.interest = 0.0;
    this.capita = 0.0;

    this.totCap = 0.0;
    this.totInterest = 0.0;

    this.nonRefund = 0.0;
    this.advance = 0.0;
    this.doc = 0.0;
    this.other = 0.0;
    this.over = 0.0;

    this.total = 0.0;

    await this.transactionData.forEach(element => {
      this.warrant += Number(element.warant);
      this.iArr += Number(element.arrearsInterest);
      this.cArr += Number(element.arrears);
      this.interest += Number(element.interest);
      this.capita += Number(element.capital);

      this.totCap += Number(element.capital) + Number(element.arrears);
      this.totInterest += Number(element.interest) + Number(element.arrearsInterest);

      this.nonRefund += Number(element.nonRefund);
      this.advance += Number(element.advance);
      this.doc += Number(element.dockCharge);
      this.other += Number(element.otherPay);
      this.over += Number(element.over);

      this.total += Number(element.total);

    });

  }

  more(id) {
    this.apiCall.get('main/getTransaction/' + id, (result) => {
      window.location.href =
        'https://rmcinvesment.com/0LoanPrint/index.html?data=' +
        JSON.stringify(result);
    });
  }
}
