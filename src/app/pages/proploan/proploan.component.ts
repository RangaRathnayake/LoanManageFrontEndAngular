import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proploan',
  templateUrl: './proploan.component.html',
  styleUrls: ['./proploan.component.scss']
})
export class ProploanComponent implements OnInit {

  loanamount;
  cusfullname;
  monthrate;
  namewithinitial;
  month;
  nic;
  date: Date;
  address;
  doccharge;
  mobile;
  rate;
  ratelist;

  getuser;
  capitalPerMonth;
  interestPerMonth;
  totalPerMonth;
  monthlyPayDate;
  refno;

  constructor(private apiCall: ApicallService, private alart: AlartService) {
    this.gettate();
    this.getuser = this.apiCall.logedUser();
    console.log(this.getuser);
  }

  ngOnInit(): void {
    this.getloanref();
  }

  apply() {

    console.log(this.date);

    if (this.loanamount && this.cusfullname && this.namewithinitial && this.month
      && this.nic && this.date && this.address && this.doccharge && this.mobile && this.rate && this.ratelist && this.refno) {

      this.capitalPerMonth = (Number(this.loanamount) / Number(this.month)).toFixed(2);
      this.interestPerMonth = (Number(this.rate) / Number(this.month)).toFixed(2);
      this.totalPerMonth = (Number(this.capitalPerMonth) + (Number(this.capitalPerMonth) * Number(this.month))).toFixed(2);
      console.log(this.capitalPerMonth);
      console.log(this.interestPerMonth);
      console.log(this.totalPerMonth);
      //  this.date.setDate( this.date.getDate() + 3 );
      //  console.log(this.date);
      let dt = new Date(this.date);
      var datePipe = new DatePipe("en-US");
      let value = datePipe.transform(dt, 'dd');
      console.log(value);

      this.apiCall.get('main/max/p', result => {
        var max =result.max;
        this.apiCall.post('customer', {
          customer: {
            fullName: this.cusfullname,
            name: this.namewithinitial,
            nic: this.nic,
            address: this.address,
            mobile: this.mobile,
            phone: this.mobile,
            project: 1,
            block: "1",
            otherString: "string",
            otherInt: 1
          }
        }, data => {
  
          console.log(data);
  
          this.apiCall.post('main', {
            main: {
              loanType: "p",
              oderNumber: this.refno,
              loanAmount: this.loanamount,
              dockCharge: this.doccharge,
              totalLoanAmount: this.loanamount,
              monthsCount: this.month,
              interestRate: this.rate,
              interestRateId: 1,
              startDate: this.date,
              userId: this.getuser.id,
              capitalPerMonth: this.capitalPerMonth,
              interestPerMonth: this.interestPerMonth,
              totalPerMonth: this.totalPerMonth,
              monthlyPayDate: value,
              NonRefundableAdvance: "0.00",
              downPayment: "0.00",
              projectId: null,
              projectName: null,
              blockNumber: null,
              propertyName: null,
              propertyCode: null,
              status: 0,
              customer: data.id,
              oderNumberInt:Number(max)+1
            }
          }, data => {
            this.alart.showNotification('success', 'save');
            this.cler();
          })
  
        })

      })
    } else {

    }

  }


  gettate() {
    this.apiCall.get('interest', result => {
      this.ratelist = result;
      console.log(result);

    })
  }

  onChange() {

  }


  getloanref() {
    this.apiCall.get('main/max/l', result => {
      console.log(result)
    })
  }


  cler(){
    this.loanamount="";
    this.cusfullname="";
    this.monthrate="";
    this.namewithinitial="";
    this.month="";
    this.nic="";
    this.address="";
    this.doccharge="";
    this.mobile="";
    this.rate="";
    this.ratelist="";

  }





}
