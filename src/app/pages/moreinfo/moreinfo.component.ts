import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.scss']
})
export class MoreinfoComponent implements OnInit {

  user;
  loannumber;
  cusname;
  totalLoanAmount;
  paid;
  current;
  anualRate;
  rateId;
  mainId; mainData;
  mainMonthCount = 0;
  monthCount = 0;
  pendingMonthCount = 0;


  transactionData;
  lastTransactionData;

  arrearsData;
  resetArriasData;
  firstArrearsData;
  isCompleteThisMonth = 0;





  finishAmount: number = 0;
  totalHaveToPay: number = 0;
  capitalPerMonth: number = 0;
  interestPerMonth: number = 0;
  arrears: number = 0;
  warrant: number = 0;
  priviarsOver: number = 0;

  inputval;
  payW = 0;
  payA = 0;
  payC = 0;
  payI = 0;
  payT = 0;
  over = 0;
  totalOver = 0;

  hasOver = false;
  overMonthCount;
  overInterest = 0;
  overCapital = 0;

  clickOnPay = false;

  constructor(private router: Router, private arout: ActivatedRoute, private apiCall: ApicallService, private alart: AlartService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.user = this.apiCall.logedUser()

    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.mainId = id;
      if (id) {
        this.getmoreinfo(id);
      } else {

      }
    });
  }

  getmoreinfo(id) {
    this.apiCall.get('main/' + id, result => {
      console.log(result);
      this.mainData = result;
      this.loannumber = result.oderNumber;
      this.cusname = result.customer.name;
      this.rateId = result.interestRateId;
      this.totalLoanAmount = result.totalLoanAmount;
      // this.capitalPerMonth = result.capitalPerMonth;
      // this.interestPerMonth = result.interestPerMonth;
      this.mainMonthCount = result.monthCount;
      this.getAnualRate();
      this.getArrears(id);
    })
  }

  getAnualRate() {
    this.apiCall.get('interest/' + this.rateId, data => {
      this.anualRate = data.rate;
    })
  }

  // getTransactionData(id) {
  //   this.apiCall.get('transaction/main/' + id, result => {
  //     if (result.length > 0) {
  //       this.transactionData = result;
  //       this.lastTransactionData = this.transactionData[this.transactionData.length - 1];
  //       console.log(this.lastTransactionData);
  //     } else {
  //       console.log("empty");
  //       this.paid = 0.00;
  //       this.current = this.totalLoanAmount;
  //     }
  //     console.log(result)
  //   })
  // }

  getArrears(id) {
    this.apiCall.get('arrears/pending/' + id, data => {
      console.log(data);
      this.arrearsData = data;
      this.resetArriasData = data;
      this.arrearsData.forEach(element => {
        if (element.status == 2) {
          this.arrears += Number(element.capitalArrears) + Number(element.interestArrears);
          this.warrant += Number(element.warrant);
          this.totalHaveToPay += Number(element.capitalArrears) + Number(element.interestArrears) + Number(element.warrant);
        }
        if (element.status == 0) {
          if (!this.firstArrearsData) {
            this.firstArrearsData = element;
          }
        }

        this.finishAmount += Number(element.capitalArrears) + Number(element.interestArrears) + Number(element.warrant) + Number(element.capital) + Number(element.interest);


      });

      this.totalHaveToPay += Number(this.firstArrearsData.capital) + Number(this.firstArrearsData.interest);

      console.log(this.arrearsData);

      console.log(this.firstArrearsData);

    })
  }

  calByArray(value) {
    this.arrearsData = this.resetArriasData;
    const length = this.arrearsData.length;
    var i = 0;
    // console.log(length + "  --  " + value);
  
    if (value <= this.finishAmount && value > 0) {

      this.clickOnPay = false;
      this.payT = value;
      this.over = 0;
      this.payW = 0;



      this.itarate(i, value);





    } else {
      this.alart.showNotification("danger", "Over Value");
      this.clickOnPay = true;
      this.arrearsData = this.resetArriasData;
    }

  }

  itarate(x, value) {
    console.log(this.arrearsData[x].warrant);
    if (Number(this.arrearsData[x].warrant) > 0) {
      console.log(">0");
      if (Number(this.arrearsData[x].warrant) <= value) {
        console.log("<value");
        this.arrearsData[x].warrant = 0;
        console.log(this.arrearsData[x]);
        this.payW += this.arrearsData[x].warrant;
        this.over = value - this.arrearsData[x].warrant;
      } else {
        console.log(">value");
        this.arrearsData[x].warrant = this.arrearsData[x].warrant - value;
        console.log(this.arrearsData[x]);
        this.payW += value;
        this.over = 0;
      }
      console.log(this.over);
    }

  }




  cal(value) {

    console.log(value);
    this.payT = value;
    this.payW = 0;
    this.payA = 0;
    this.payC = 0;
    this.payI = 0;
    this.over = 0;
    this.pendingMonthCount = 0;
    this.isCompleteThisMonth = 0;

    this.overMonthCount;
    this.overInterest = 0;
    this.overCapital = 0;
    this.hasOver = false;

    if (this.finishAmount >= this.payT) {
      this.clickOnPay = false;
      if (value > 0) {
        if (this.warrant <= value) {
          this.payW = this.warrant;
          this.over = value - this.warrant;
        } else {
          this.payW = value;
          this.over = 0;
        }

        if (this.over > 0) {
          if (this.arrears <= this.over) {
            this.payA = this.arrears;
            this.over = this.over - this.arrears;
          } else {
            this.payA = this.over;
            this.over = 0;
          }
        }

        if (this.over > 0) {
          if (this.interestPerMonth <= this.over) {
            this.payI = this.interestPerMonth;
            this.over = this.over - this.interestPerMonth;
          } else {
            this.payI = this.over;
            this.over = 0;
          }
        }

        if (this.over > 0) {
          if (this.capitalPerMonth <= this.over) {
            this.payC = this.capitalPerMonth;
            this.over = this.over - this.capitalPerMonth;
            this.isCompleteThisMonth = 1;
          } else {
            this.payC = this.over;
            this.over = 0;
          }
        }


      }

      console.log(this.over);
      this.totalOver = this.over;
      if (this.over > 0) {
        this.hasOver = true;
        var nextMonth: number = Number(this.capitalPerMonth) + Number(this.interestPerMonth);
        console.log(nextMonth);
        var overCount = this.over / nextMonth;
        if (overCount > 1) {
          this.overMonthCount = Math.floor(overCount);
          this.over = this.over - (nextMonth * this.overMonthCount);

          if (this.over > 0) {
            if (this.over >= this.interestPerMonth) {
              this.overInterest = this.interestPerMonth;
              this.over = this.over - this.interestPerMonth;
            } else {
              this.overInterest = this.over;
              this.over = 0;
            }
          }

          if (this.over > 0) {
            if (this.over >= this.capitalPerMonth) {
              this.overCapital = this.capitalPerMonth;
              this.over = this.over - this.capitalPerMonth;
            } else {
              this.overCapital = this.over;
              this.over = 0;
            }
          }

          if (this.over > 0) {
            console.log("ERROR  OVER ")
          }

        } else {
          this.overMonthCount = 0;
          if (this.over > 0) {
            if (this.over >= this.interestPerMonth) {
              this.overInterest = this.interestPerMonth;
              this.over = this.over - this.interestPerMonth;
            } else {
              this.overInterest = this.over;
              this.over = 0;
            }
          }

          if (this.over > 0) {
            if (this.over >= this.capitalPerMonth) {
              this.overCapital = this.capitalPerMonth;
              this.over = this.over - this.capitalPerMonth;
            } else {
              this.overCapital = this.over;
              this.over = 0;
            }
          }

          if (this.over > 0) {
            console.log("ERROR  OVER ")
          }

        }
      }
      console.log("Over Count xx = " + this.overMonthCount);
      console.log("Over interest = " + this.overInterest);
      console.log("Over capital = " + this.overCapital);
    } else {
      this.alart.showNotification("danger", "Over The Amount");
      this.clickOnPay = true;
    }






  }

  pay() {
    if (this.payT > 0) {
      this.clickOnPay = true;
      console.log("warant " + this.payW)
      console.log("arears " + this.payA)
      console.log("capital " + this.payC)
      console.log("interest " + this.payI)
      console.log("Over " + this.over)
      console.log("total " + this.payT);

      let obj = {
        transaction: {
          day: new Date(),
          capital: this.payC,
          interest: this.payI,
          warant: this.payW,
          dockCharge: 0,
          monthCount: 1,
          nonRefund: 0,
          advance: 0,
          otherPay: 0,
          over: this.totalOver,
          total: this.payT,
          payType: "installment",
          cheque: 0,
          loanType: "l",
          interestRate: this.anualRate / 12,
          status: 1,
          customer: this.mainData.customer.id,
          main: this.mainData.id,
          user: this.user.id,
        }
      }

      var day = this.datePipe.transform(new Date(), "yyyy-MM-dd")

      let arrObj = {
        id: this.firstArrearsData.id,
        completeDate: day,
        installment: 1,
        capital: Number(this.capitalPerMonth) - Number(this.payC),
        interest: Number(this.interestPerMonth) - Number(this.payI),
        main: this.mainData.id,
        status: this.isCompleteThisMonth
      }

      if (this.hasOver) {
        if (this.overMonthCount > 0) {

        } else {

        }
      }

      this.apiCall.post('transaction', obj, data => {
        console.log(data);
        this.apiCall.post('arrears', { arrears: arrObj }, dd => {
          console.log(dd);
        })
      })
    } else {
      this.alart.showNotification("danger", "Please Enter Pay Amount Correctly")
    }
  }

}
