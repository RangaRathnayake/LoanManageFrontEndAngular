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
  totloan;

  getuser;
  capitalPerMonth;
  interestPerMonth;
  totalPerMonth;
  monthlyPayDate;
  refno;

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

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


      if (this.validloanamount() && this.validmonth() && this.validnic() && this.vaiddoccharge() && this.vaidmobile()) {
        var rateid = this.rate.id
        var rate = this.rate.rate;

        this.totloan = this.loanamount;
        if (this.checked) {
          this.loanamount = Number(this.loanamount) + Number(this.doccharge);
        } else {
          this.loanamount = Number(this.loanamount);
        }

        this.capitalPerMonth = (Number(this.loanamount) / Number(this.month)).toFixed(2);
        this.interestPerMonth = (Number(rate) / Number(1200) * Number(this.capitalPerMonth)).toFixed(2);
        this.totalPerMonth = (Number(this.capitalPerMonth) + Number(this.interestPerMonth)).toFixed(2);



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
          if (result.max == null) {
            console.log("okkkkkkk");
            var max = 0;
          } else {
            console.log("noooo");
            max = result.max;
          }
          console.log(max);

            this.apiCall.post('main', {
              main: {
                loanType: "p",
                oderNumber: this.refno,
                loanAmount: this.totloan,
                dockCharge: this.doccharge,
                totalLoanAmount: (Number(this.loanamount)).toFixed(2),
                monthsCount: this.month,
                interestRate: Number(rate) / 12,
                interestRateId: rateid,
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
                customer: 1, // this is hardcord
                oderNumberInt: Number(max) + 1
              }
            }, data => {
              this.alart.showNotification('success', 'save');
              // this.cler();
            })

          // })

        })
      }
    } else {
      this.alart.showNotification('warning', 'check all feilds');
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


  cler() {
    this.loanamount = "";
    this.cusfullname = "";
    this.monthrate = "";
    this.namewithinitial = "";
    this.month = "";
    this.nic = "";
    this.address = "";
    this.doccharge = "";
    this.mobile = "";
    this.rate = "";
    this.ratelist = "";

  }

  vaidmobile(): boolean {
    var ismobile = false;
    if (this.mobile.length == 10 && Number(this.mobile)) {
      ismobile = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid mobile number');
    }
    console.log(ismobile);
    return ismobile;
  }

  validloanamount(): boolean {
    var isloanamount = false;
    if (Number(this.loanamount)) {
      isloanamount = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid loan amount');
    }
    return isloanamount;
  }

  validmonth(): boolean {
    var ismonth = false;
    if (Number(this.month)) {
      ismonth = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid month');
    }
    return ismonth;
  }

  validnic(): boolean {
    var isnic = false;
    if (this.nic.length >= 10 && this.nic.length <= 12) {
      isnic = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid nic');
    }
    return isnic;
  }

  vaiddoccharge(): boolean {
    var isdocvharge = false;
    if (Number(this.doccharge)) {
      isdocvharge = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid document charge');
    }
    return isdocvharge;
  }

  savecus(){
    if(this.nic && this.mobile && this.cusfullname && this.namewithinitial && this.address){
      if (  this.validnic()  && this.vaidmobile() ) {
        this.apiCall.post('customer', {
          customer: {
            fullName: this.cusfullname,
            name: this.namewithinitial,
            nic: this.nic,
            address: this.address,
            mobile: this.mobile,
            phone: this.mobile,
            project: 0,
            block: "",
            otherString: "",
            otherInt: 0
          }
        }, data => {

        })
      }
    }else{
      this.alart.showNotification('warning', 'check all feilds');
    }

   
  }




}
