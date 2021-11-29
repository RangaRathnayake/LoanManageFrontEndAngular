import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newapplication',
  templateUrl: './newapplication.component.html',
  styleUrls: ['./newapplication.component.scss']
})
export class NewapplicationComponent implements OnInit {

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

  constructor(private apiCall: ApicallService, private alart: AlartService) {
    this.gettate();
    this.getuser = this.apiCall.logedUser();
    console.log(this.getuser);
  }

  ngOnInit(): void {
  }

  apply() {

    console.log(this.date);

    if (this.loanamount && this.cusfullname && this.namewithinitial && this.month
      && this.nic && this.date && this.address && this.doccharge && this.mobile && this.rate && this.ratelist) {

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






      this.apiCall.post('main', {
        main: {
          loanType: "l",
          oderNumber: "L1",
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
          customer: 1
        }
      }, data => {
        this.alart.showNotification('success', 'save');
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


}
