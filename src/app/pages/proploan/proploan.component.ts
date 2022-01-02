import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, } from '@angular/router';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  paytypelist = [
    {
      id: 1,
      type: 'non refundable advance'
    },
    {
      id: 2,
      type: 'Further advance payment'
    }
  ]

  paytype;
  cusfullname2;
  advancepay;

  projectlist;
  project;

  lotnum;
  refno1;

  //visivly

  iscus: boolean = false;
  ispayment: boolean = false;
  isnewapp: boolean = false;

  ischeck = false;
  ischecksave = false;


  //dissplay
  dicapital;
  dianualrate;
  dimonthrate;
  diinstare;
  ditotal;
  difulltotal;
  dilaoanamount;


  //complete
  isvisivleone = false;
  isproseedone = false;

  isvisibletwo = false;
  isproseedtwo = false;

  isvisibletree = false;
  isproseedtree = false;

  Isone = true;
  Istwo = true;
  Isthree = true;
  isvisibletwobtn = false;

  mainid;
  downpay;
  nonref;
  cusid;
  selectedRadio = "1";

  chequeno;


  val;
  diss;
  perches;
  mainids;


  constructor(private apiCall: ApicallService, private alart: AlartService, private router: Router, private arout: ActivatedRoute, private datePipe: DatePipe) {
    this.gettate();
    this.getuser = this.apiCall.logedUser();
    console.log(this.getuser);
    this.iscus = true;
    this.isvisivleone = true;
    // this.selectedRadio=1;
  }

  ngOnInit(): void {

    this.arout.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        console.log("test one");
        this.Isone = false;
        this.Istwo = true;
        this.Isthree = false;
        this.isvisibletwobtn = true;
        this.getcus(id);

        this.mainid = id;


      } else {
        this.getloanref();
        this.getallproject();
        console.log("test two");
      }
    });


  }

  apply() {

    console.log(this.loanamount);
    console.log(this.month);
    console.log(this.date);
    console.log(this.doccharge);
    console.log(this.rate);
    console.log(this.ratelist);


    if (this.loanamount && this.month && this.date && this.doccharge && this.rate && this.ratelist ) {


      if (this.validloanamount() && this.validmonth() && this.vaiddoccharge()) {
        var rateid = this.rate.id
        var rate = this.rate.rate;

        this.totloan = this.loanamount;
        if (this.checked) {
          this.loanamount = Number(this.loanamount) + Number(this.doccharge);
        } else {
          this.loanamount = Number(this.loanamount);
        }

        this.capitalPerMonth = (Number(this.loanamount) / Number(this.month)).toFixed(2);
        this.interestPerMonth = (Number(rate) / Number(1200) * Number(this.loanamount)).toFixed(2);
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

        this.apiCall.get('main/max/P', result => {
          if (result.max == null) {
            console.log("okkkkkkk");
            var max = 0;
          } else {
            console.log("noooo");
            max = result.max;
          }

          this.apiCall.post('main/save', {
            main: {
              id: Number(localStorage.getItem("mainid")),
              loanType: "P",
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
              status: 0,
              projectId: Number(this.project.id),
              projectName: this.project.name,
              blockNumber: this.lotnum,
              propertyName: null,
              propertyCode: null,
            }
          }, data => {
            this.alart.showNotification('success', 'save');
            this.isvisivleone = false;
            this.isvisibletwo = false;
            this.isvisibletree = true;

            this.isproseedtree = true;
            if (data) {
              this.router.navigate(['fulldetails', data.id]);
            }
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
    this.apiCall.get('main/max/L', result => {
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
    if (this.mobile.length === 10) {
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
    if (Number(this.doccharge) >= 0) {
      isdocvharge = true;
    } else {
      this.alart.showNotification('warning', 'Enter valid document charge');
    }
    return isdocvharge;
  }

  savecus() {
    if (this.nic && this.mobile && this.cusfullname && this.namewithinitial && this.address) {
      if (this.validnic()) {
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
         
          this.cusfullname2 = data.name;
          localStorage.setItem("cusid", data.id);
          this.isvisivleone = false;
          this.isvisibletwo = true;
          this.isvisibletree = false;

          this.isproseedone = true;


          this.apiCall.get('main/max/P', result => {
            if (result.max == null) {
              console.log("okkkkkkk");
              var max = 0;
            } else {
              console.log("noooo");
              max = result.max;
            }

            this.apiCall.post('main/save', {
              main: {
                loanType: "P",
                oderNumber: this.refno1,
                userId: this.getuser.id,
                NonRefundableAdvance: 0,
                downPayment: 0,
                status: 0,
                customer: localStorage.getItem("cusid"), // this is hardcord
                oderNumberInt: Number(max) + 1,
                value: this.val,
                projectId: Number(this.project.id),
                projectName: this.project.name,
                blockNumber: this.lotnum,
                perches: this.perches,
                discount: this.diss,
                sellingPrice:Number(this.val)-Number(this.diss)

              }
            }, datamain => {
              this.alart.showNotification('success', 'save');
              this.mainids=datamain.id;
            })


          })

        })
      }
    } else {
      this.alart.showNotification('warning', 'check all feilds');
    }


  }

  payadvace() {
    if (this.cusfullname2 && this.paytype && this.advancepay ) {
      if (Number(this.advancepay)) {

        if (this.selectedRadio == "2" && this.chequeno || this.selectedRadio == "1") {
          //if(this.chequeno){

          var paytype;
          var chequeno;

          if (this.selectedRadio == "1") {
            paytype = "cash";
            chequeno = "-";
          } else {
            paytype = "cheque";
            chequeno = this.chequeno;
          }

          var nonradvance = 0;
          var downpay = 0;

          if (this.paytype.id == "1") {
            nonradvance = this.advancepay;
          } else {
            downpay = this.advancepay;
          }

          this.apiCall.get('main/max/P', result => {
            if (result.max == null) {
              console.log("okkkkkkk");
              var max = 0;
            } else {
              console.log("noooo");
              max = result.max;
            }

            this.apiCall.post('main/save', {
              main: {
                id:Number( this.mainids),
                loanType: "P",
                oderNumber: this.refno1,
                userId: this.getuser.id,
                NonRefundableAdvance: (Number(nonradvance)).toFixed(2),
                downPayment: (Number(downpay)).toFixed(2),
                status: 0,
                customer: localStorage.getItem("cusid"), // this is hardcord
                oderNumberInt: Number(max) + 1
              }
            }, data => {
              this.alart.showNotification('success', 'save');
              localStorage.setItem("mainid", data.id);
              this.isvisivleone = false;
              this.isvisibletwo = false;
              this.isvisibletree = true;
              this.isproseedtwo = true;


              let obj = {
                transaction: {
                  day: new Date(),
                  capital: 0,
                  interest: 0,
                  warant: 0,
                  arrears: 0,
                  dockCharge: 0,
                  monthCount: 0,
                  nonRefund: nonradvance,
                  advance: downpay,
                  otherPay: 0,
                  over: 0,
                  total: this.advancepay,
                  payType: paytype,
                  cheque: chequeno,
                  loanType: "P",
                  interestRate: 0,
                  status: 1,
                  customer: localStorage.getItem("cusid"),
                  main: data.id,
                  user: this.getuser.id
                }
              }
              // var day = this.datePipe.transform(new Date(), "yyyy-MM-dd");
              this.apiCall.post('main/saveTransaction', obj, data => {
                console.log("xxxxxx"); 
                console.log(data);
                console.log("xxxxxx"); 

                window.location.href = "https://rmcinvesment.com/0LoanPrint/index.html?data=" + JSON.stringify(data);

              })

            })


          })

          // }else{
          //   this.alart.showNotification('warning', 'enter cheque number');
          // }

        } else {
          this.alart.showNotification('warning', 'enter cheque number');
        }
      } else {
        this.alart.showNotification('warning', 'invalid pay amount');
      }
    } else {
      this.alart.showNotification('warning', 'check all feilds');
    }
  }


  updatepayadvace() {
    if (this.cusfullname2 && this.paytype && this.advancepay) {
      if (Number(this.advancepay)) {

        if (this.selectedRadio == "2" && this.chequeno || this.selectedRadio == "1") {
          // if (this.chequeno) {
          var paytype;
          var chequeno;

          if (this.selectedRadio == "1") {
            paytype = "cash";
            chequeno = "-";
          } else {
            paytype = "cheque";
            chequeno = this.chequeno;
          }

          this.apiCall.get('main/' + this.mainid, result => {
            this.nonref = 0.00;
            this.downpay = 0.00;


            if (this.paytype.id == 1) {
              this.nonref = this.advancepay;
            } else {
              this.downpay = this.advancepay;
            }

            this.apiCall.post('main/save', {
              main: {
                loanType: "P",
                id: Number(this.mainid),
                userId: this.getuser.id,
                NonRefundableAdvance: this.nonref,
                downPayment: this.downpay,
                status: 0,
                customer: this.cusid
              }
            }, data => {


              let obj = {
                transaction: {
                  day: new Date(),
                  capital: 0,
                  interest: 0,
                  warant: 0,
                  arrears: 0,
                  dockCharge: 0,
                  monthCount: 0,
                  nonRefund: this.nonref,
                  advance: this.downpay,
                  otherPay: 0,
                  over: 0,
                  total: this.advancepay,
                  payType: paytype,
                  cheque: chequeno,
                  loanType: "P",
                  interestRate: 0,
                  status: 1,
                  customer: localStorage.getItem("cusid"),
                  main: Number(this.mainid),
                  user: this.getuser.id
                }
              }


              this.apiCall.post('main/saveTransaction', obj, datas => {
                console.log(datas);

                window.location.href = "http://localhost/0LoanPrint/prop.html?data=" + JSON.stringify(data);
                // window.open("https://rmcinvesment.com/0LoanPrint/index.html?data=" + JSON.stringify(datas), '_blank');

              })


              this.alart.showNotification('success', 'save');
              this.isvisivleone = false;
              this.isvisibletwo = false;
              this.isvisibletree = true;
              this.isproseedtwo = true;
            })



          })
          // } else {
          //   this.alart.showNotification('warning', 'enter cheque number');
          // }
        } else {
          this.alart.showNotification('warning', 'enter cheque number');
        }

      }
    }
  }

  getallproject() {
    this.apiCall.get('project/get', result => {
      this.projectlist = result;
      console.log(result);

    })
  }

  getcus(id) {
    this.apiCall.get('main/' + id, result => {
      this.cusfullname2 = result.customer.name;
      this.cusid = result.customer.id;
    })
  }


  calloan() {

    if (this.loanamount && this.month

      && this.date && this.rate && this.ratelist  ) {


      if (this.validloanamount() && this.validmonth() && this.vaiddoccharge()) {

        if (this.checked) {
          this.dicapital = ((Number(this.loanamount) + Number(this.doccharge)) / Number(this.month)).toFixed(2);
          this.dilaoanamount = Number(this.loanamount) + Number(this.doccharge);
        } else {
          this.dicapital = (Number(this.loanamount) / Number(this.month)).toFixed(2);
          this.dilaoanamount = Number(this.loanamount);
        }

        this.dianualrate = this.rate.rate;
        this.dimonthrate = (Number(this.dianualrate) / 12).toFixed(2);
        this.diinstare = (Number(this.dilaoanamount) * Number(this.dimonthrate) / 100).toFixed(2);
        this.ditotal = (Number(this.dicapital) + Number(this.diinstare)).toFixed(2);
        this.difulltotal = (Number(this.ditotal) * Number(this.month)).toFixed(2);

        this.ischeck = true;
        this.ischecksave = true;
      }

    } else {
      this.alart.showNotification('warning', 'check all feilds');
    }



  }

  radioChange(evn) {
    console.log(evn.value);
    console.log(this.selectedRadio);
  }




}
