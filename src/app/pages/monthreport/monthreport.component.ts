import { Component, OnInit } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-monthreport',
  templateUrl: './monthreport.component.html',
  styleUrls: ['./monthreport.component.scss']
})
export class MonthreportComponent implements OnInit {

  type;
  year;
  month;
  isFind = false;


  id = null;
  interest = 0;
  capital = 0;
  rental = 0;
  warrant = 0
  doc = 0;

  nonref = 0
  advance = 0;

  other = 0

  total = 0
  expence = 0
  balance = 0

  updated: ''



  constructor(private api: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
  }

  selectType(type) {
    this.type = type;
  }

  find() {
    console.log(this.type, this.year, this.month);
    if (this.type && this.year && this.month) {
      this.isFind = true;
      this.api.post('report/find', { body: { data: { type: this.type, year: this.year, month: this.month } } }, res => {
        console.log(res);
        if (res) {
          this.clearAll();
          this.alart.showNotification('success', 'You can update report');
          this.assignForUpdate(res);
        }
      })
    } else {
      this.alart.showNotification('warning', 'Please Check the feelds')
    }
  }

  calculate() {
    this.rental = Number(this.capital) + Number(this.interest);

    this.total = Number(this.rental) + Number(this.warrant) + Number(this.doc) + Number(this.nonref) + Number(this.advance) + Number(this.other);

    this.balance = Number(this.total) - Number(this.expence);
  }

  save() {
    let obj = {}

    if (this.id > 0) {
      obj = {
        id: this.id,
        type: this.type,
        month: this.month,
        year: this.year,
        rental: this.rental,
        capital: this.capital,
        interest: this.interest,
        warrant: this.warrant,
        doc: this.doc,
        nonref: this.nonref,
        advance: this.advance,
        other: this.other,
        total: this.total,
        expence: this.expence,
        balance: this.balance,
        updated: this.updated += " - " + new Date() + "",
      }
    } else {
      obj = {
        type: this.type,
        month: this.month,
        year: this.year,
        rental: this.rental,
        capital: this.capital,
        interest: this.interest,
        warrant: this.warrant,
        doc: this.doc,
        nonref: this.nonref,
        advance: this.advance,
        other: this.other,
        total: this.total,
        expence: this.expence,
        balance: this.balance,
        updated: this.updated += " - " + new Date() + "",
      }
    }

    console.log(obj);

    this.api.post('report/create', { body: obj }, res => {
      console.log(res);
      if (res.id > 0) {
        this.clearAll();
        this.alart.showNotification('success', 'Report Save Success');
      }
    })

  }

  clearAll() {
    this.type = null;
    this.year = null;
    this.month = null;
    this.isFind = false;
    this.id = null;
    this.interest = 0;
    this.capital = 0;
    this.rental = 0;
    this.warrant = 0
    this.doc = 0;
    this.nonref = 0
    this.advance = 0;
    this.other = 0
    this.total = 0
    this.expence = 0
    this.balance = 0
    this.updated = '';
  }

  assignForUpdate(res) {
    this.id = res.id;
    this.type = res.type;
    this.year = res.year;
    this.month = res.month;
    this.isFind = true;
    this.interest = res.interest;
    this.capital = res.capital;
    this.rental = res.rental;
    this.warrant = res.warrant;
    this.doc = res.doc;
    this.nonref = res.nonref;
    this.advance = res.advance;
    this.other = res.other;
    this.total = res.total;
    this.expence = res.expence;
    this.balance = res.balance;
    this.updated = res.updated



  }

}
