import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


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
  totloan;
  nextnum: number;

  getuser;
  capitalPerMonth;
  interestPerMonth;
  totalPerMonth;
  monthlyPayDate;


  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  ischeck = false;
  ischecksave = false;

  //dissplay
  dicapital;
  dianualrate;
  dimonthrate;
  diinstare;
  ditotal;
  difulltotal;

  constructor(private apiCall: ApicallService, private alart: AlartService, private router: Router, private arout: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getuser = this.apiCall.logedUser();
    this.gettate();
    console.log(this.getuser);
  }

  apply() {




    // මේ ටිකට වෙන වෙනම if දාලා  වැලිඩේට් කරන්න වෙනවා හොද error message පෙන්වන්න.. මොබයිල් නම්බර් එක වැලිටේට් කරන්න ලෙන්ත් එක 10 කට ඩේට් එක හරි ෆෝමැට් එකෙන්  තියනවාද කියලා චෙක් කරන්න. එරර් මැසේජ් දාන්න.

    if (this.loanamount && this.cusfullname && this.namewithinitial && this.month
      && this.nic && this.date && this.address && this.doccharge && this.mobile && this.rate && this.ratelist) {

      // if(this.validloanamount()){
      //   if(this.validmonth()){
      //     if(this.validnic()){
      //       if(this.vaiddoccharge()){
      //         if(this.vaidmobile()){

      //         }
      //       }
      //     }
      //   }

      // }

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
        let dt = new Date(this.date);
        var datePipe = new DatePipe("en-US");
        let value = datePipe.transform(dt, 'dd');
        console.log(value);

        this.apiCall.get('main/max/L', result => {

          if (result.max == null) {
            console.log("okkkkkkk");
            var max = 0;

          } else {
            console.log("noooo");
            max = result.max;
          }
          console.log(max);
          this.nextnum = Number(max) + 1;
          this.apiCall.post('customer/save', {
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

            console.log(data);

            this.apiCall.post('main/save', {
              main: {
                loanType: "L",
                oderNumber: "L" + this.nextnum,
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
                customer: data.id,
                oderNumberInt: Number(max) + 1
              }
            }, data => {
              if (data) {
                this.ischecksave = false;
                this.alart.showNotification('success', 'save');
                this.router.navigate(['fulldetails', data.id]);
              }
            })

          })
        })



      }



    } else {
      this.alart.showNotification('warning', 'check all feilds');
    }

  }


  gettate() {
    this.apiCall.get('interest/get', result => {
      this.ratelist = result;
      console.log(result);

    })
  }

  onChange() {

  }


  getloanref() {
    this.apiCall.get('interest/get', result => {

    })

  }

  cler() {
    this.loanamount = '';
    this.cusfullname = '';
    this.monthrate = '';
    this.namewithinitial = '';
    this.month = '';
    this.nic = '';
    this.address = '';
    this.doccharge = '';
    this.mobile = '';
    this.rate = '';
    this.ratelist = '';

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


  calloan() {
    if (this.checked) {
      this.dicapital = ((Number(this.loanamount) + Number(this.doccharge)) / Number(this.month)).toFixed(2);
    } else {
      this.dicapital = (Number(this.loanamount) / Number(this.month)).toFixed(2);
    }

    this.dianualrate = this.rate.rate;
    this.dimonthrate = (Number(this.dianualrate) / 12).toFixed(2);
    this.diinstare = (Number(this.dicapital) * Number(this.dimonthrate) / 100).toFixed(2);
    this.ditotal = (Number(this.dicapital) + Number(this.diinstare)).toFixed(2);
    this.difulltotal = (Number(this.ditotal) * Number(this.month)).toFixed(2);
    this.ischeck = true;
    this.ischecksave = true;
  }

}
