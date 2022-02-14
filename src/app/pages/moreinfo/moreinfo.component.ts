import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.scss'],
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
  mainId;
  mainData;
  mainMonthCount = 0;
  monthCount = 0;
  pendingMonthCount = 0;

  transactionData;
  lastTransactionData;

  arrearsData;
  dayCount;
  resetArriasData;
  firstArrearsData;
  isCompleteThisMonth = 0;

  allFinish = false;

  payType = 'Cash';
  cheaueNumber;

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
  today;

  hasOver = false;
  overMonthCount;
  overInterest = 0;
  overCapital = 0;

  clickOnPay = false;
  enter = false;

  totalCapital = 0;
  totalInterest = 0;

  reportPath = environment.reportPath;

  constructor(
    private router: Router,
    private arout: ActivatedRoute,
    private apiCall: ApicallService,
    private alart: AlartService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.user = this.apiCall.logedUser();

    this.arout.params.subscribe((params) => {
      const id = params['id'];
      this.mainId = id;
      if (id) {
        this.getmoreinfo(id);
      } else {
      }
    });
  }

  getmoreinfo(id) {
    this.apiCall.get('main/' + id, (result) => {
      console.log(result);
      this.mainData = result;
      this.loannumber = result.oderNumber;
      this.cusname = result.customer.name;
      this.rateId = result.interestRateId;
      this.totalLoanAmount = result.totalLoanAmount;
      this.mainMonthCount = result.monthCount;
      this.getAnualRate();
      this.getArrears(id);
      this.getDayCount(id);
    });
  }

  getAnualRate() {
    this.apiCall.get('interest/' + this.rateId, (data) => {
      this.anualRate = data.rate;
    });
  }

  getArrears(id) {
    console.log(id);
    this.apiCall.get('arrears/pending/' + id, (data) => {
      this.arrearsData = data;

      this.arrearsData.forEach((element) => {
        this.totalCapital += Number(element.capital);
        this.totalInterest += Number(element.interest);

        if (element.status == 2) {
          this.arrears +=
            Number(element.capitalArrears) + Number(element.interestArrears);
          this.warrant += Number(element.warrant);
          this.totalHaveToPay +=
            Number(element.capitalArrears) +
            Number(element.interestArrears) +
            Number(element.warrant);
        }

        if (element.status == 0) {
          if (!this.firstArrearsData) {
            this.firstArrearsData = element;
          }
        }

        this.finishAmount +=
          Number(element.capitalArrears) +
          Number(element.interestArrears) +
          Number(element.warrant) +
          Number(element.capital) +
          Number(element.interest);
      });

      if (this.firstArrearsData)
        this.totalHaveToPay +=
          Number(this.firstArrearsData.capital) +
          Number(this.firstArrearsData.interest);

      console.log(this.firstArrearsData);
    });
  }

  getDayCount(id) {
    this.apiCall.get('main/count/' + id, (data) => {
      console.log(data);
      this.dayCount = data.count;
    });
  }

  calByArray(value) {
    const length = this.arrearsData.length;
    var i = 0;

    if (value <= this.finishAmount && value > 0) {
      if (this.enter) {
        this.resetAll();
        this.enter = false;
        this.allFinish = false;
      } else {
        if (this.finishAmount == value) {
          this.allFinish = true;
          console.log('ALL FINISH');
        } else {
          this.allFinish = false;
        }
        this.clickOnPay = false;
        this.payT = Number(value);
        this.itarate(i, value);
        this.enter = true;
      }
    } else {
      this.alart.showNotification('danger', 'Over Value');
      this.clickOnPay = true;
      this.resetAll();
    }
  }

  itarate(x, value) {
    this.over = Number(value);
    console.log(this.arrearsData);
    // console.log(this.arrearsData[x].warrant);
    try {
      if (this.arrearsData[x].warrant > 0) {
        if (Number(this.arrearsData[x].warrant) <= this.over) {
          this.payW += Number(this.arrearsData[x].warrant);
          this.over = this.over - Number(this.arrearsData[x].warrant);
          this.arrearsData[x].warrantPaid =
            Number(this.arrearsData[x].warrantPaid) +
            Number(this.arrearsData[x].warrant);
          this.arrearsData[x].warrant = 0;
        } else {
          this.payW += this.over;
          this.arrearsData[x].warrantPaid =
            Number(this.arrearsData[x].warrantPaid) + Number(this.over);
          this.arrearsData[x].warrant =
            Number(this.arrearsData[x].warrant) - this.over;
          this.over = 0;
        }
      }

      if (Number(this.arrearsData[x].interestArrears) > 0 && this.over > 0) {
        if (Number(this.arrearsData[x].interestArrears) <= this.over) {
          this.payA += Number(this.arrearsData[x].interestArrears);
          this.over = this.over - Number(this.arrearsData[x].interestArrears);
          this.arrearsData[x].interestPaid =
            Number(this.arrearsData[x].interestPaid) +
            Number(this.arrearsData[x].interestArrears);
          this.arrearsData[x].interestArrears = 0;
        } else {
          this.payA += this.over;
          this.arrearsData[x].interestPaid =
            Number(this.arrearsData[x].interestPaid) + Number(this.over);
          this.arrearsData[x].interestArrears =
            Number(this.arrearsData[x].interestArrears) - this.over;
          this.over += 0;
        }
      }

      if (Number(this.arrearsData[x].capitalArrears) > 0 && this.over > 0) {
        if (Number(this.arrearsData[x].capitalArrears) <= this.over) {
          this.payA += Number(this.arrearsData[x].capitalArrears);
          this.over = this.over - Number(this.arrearsData[x].capitalArrears);
          this.arrearsData[x].capitalPaid =
            Number(this.arrearsData[x].capitalPaid) +
            Number(this.arrearsData[x].capitalArrears);
          this.arrearsData[x].capitalArrears = 0;
          this.arrearsData[x].status = 1;
          this.arrearsData[x].completeDate = this.today;
        } else {
          this.payA += this.over;
          this.arrearsData[x].capitalPaid =
            Number(this.over) + Number(this.arrearsData[x].capitalPaid);
          this.arrearsData[x].capitalArrears =
            Number(this.arrearsData[x].capitalArrears) - this.over;
          this.over = 0;
        }
      }

      if (Number(this.arrearsData[x].interest) > 0 && this.over > 0) {
        if (Number(this.arrearsData[x].interest) <= this.over) {
          this.payI += Number(this.arrearsData[x].interest);
          this.arrearsData[x].interestPaid =
            Number(this.arrearsData[x].interestPaid) +
            Number(this.arrearsData[x].interest);
          this.over = this.over - Number(this.arrearsData[x].interest);
          this.arrearsData[x].interest = 0;
        } else {
          this.payI += this.over;
          this.arrearsData[x].interestPaid =
            Number(this.arrearsData[x].interestPaid) + Number(this.over);
          this.arrearsData[x].interest =
            Number(this.arrearsData[x].interest) - this.over;
          this.over = 0;
        }
      }

      if (Number(this.arrearsData[x].capital) > 0 && this.over > 0) {
        if (Number(this.arrearsData[x].capital) <= this.over) {
          this.payC += Number(this.arrearsData[x].capital);
          this.arrearsData[x].capitalPaid =
            Number(this.arrearsData[x].capitalPaid) +
            Number(this.arrearsData[x].capital);
          this.over = this.over - Number(this.arrearsData[x].capital);
          this.arrearsData[x].capital = 0;
          this.arrearsData[x].status = 1;
          this.arrearsData[x].completeDate = this.today;
        } else {
          this.payC += this.over;
          this.arrearsData[x].capitalPaid =
            Number(this.arrearsData[x].capitalPaid) + Number(this.over);
          this.arrearsData[x].capital =
            Number(this.arrearsData[x].capital) - this.over;
          this.over = 0;
        }
      }

      if (this.arrearsData.length > x - 1 && this.over > 0) {
        x++;
        this.itarate(x, this.over);
      }
    } catch (error) {
      console.log(error);
    }
  }

  resetAll() {
    this.arrearsData = null;
    this.arrears = 0;
    this.warrant = 0;
    this.totalHaveToPay = 0;
    this.finishAmount = 0;
    this.getArrears(this.mainId);
    this.payT = 0;
    this.payW = 0;
    this.payA = 0;
    this.payC = 0;
    this.payI = 0;
    this.over = 0;
    this.pendingMonthCount = 0;
    this.isCompleteThisMonth = 0;
    this.capitalPerMonth = 0;
    this.interestPerMonth = 0;
    this.priviarsOver = 0;
    this.totalInterest = 0;
    this.totalCapital = 0;
  }

  pay() {
    if (this.payT > 0) {
      this.clickOnPay = true;
      console.log('warant ' + this.payW);
      console.log('arears ' + this.payA);
      console.log('capital ' + this.payC);
      console.log('interest ' + this.payI);
      console.log('Over ' + this.over);
      console.log('total ' + this.payT);

      let obj = {
        transaction: {
          day: new Date(),
          capital: this.payC,
          interest: this.payI,
          warant: this.payW,
          arrears: this.payA,
          dockCharge: 0,
          monthCount: 1,
          nonRefund: 0,
          advance: 0,
          otherPay: 0,
          over: this.totalOver,
          total: this.payT,
          payType: this.payType,
          cheque: this.cheaueNumber,
          loanType: this.mainData.loanType,
          interestRate: this.anualRate / 12,
          status: 1,
          customer: this.mainData.customer.id,
          main: this.mainData.id,
          user: this.user.id,
        },
      };
      var day = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      if (this.hasOver) {
        if (this.overMonthCount > 0) {
        } else {
        }
      }

      console.log(this.arrearsData);
      this.apiCall.post('main/saveTransaction', obj, (data) => {
        console.log(data);

        this.apiCall.post(
          'arrears/update',
          { arrearss: this.arrearsData },
          (dd) => {
            console.log(dd);
            this.resetAll();
            this.enter = false;
          }
        );

        if (this.allFinish) {
          this.mainData.status = 3;
          this.apiCall.post('main/save', { main: this.mainData }, (ddd) => {
            console.log(ddd);
          });
        }

        window.location.href =
          this.reportPath + 'index.html?data=' + JSON.stringify(data);
      });
    } else {
      this.alart.showNotification(
        'danger',
        'Please Enter Pay Amount Correctly'
      );
    }
  }
}
