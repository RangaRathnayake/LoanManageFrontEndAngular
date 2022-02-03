import { Component, OnInit } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-expencese',
  templateUrl: './expencese.component.html',
  styleUrls: ['./expencese.component.scss'],
})
export class ExpenceseComponent implements OnInit {
  exTypes;
  selectedExType;

  description;
  date;
  to;
  amount;
  isdoccharfe = false;
  isdocchargeamount = false;
  islist = false;
  loannum;
  doclist;
  dockCharge;
  mainid;

  getuser;
  cusid;

  constructor(private apiCall: ApicallService, private alart: AlartService) {
    this.getuser = this.apiCall.logedUser();
  }

  ngOnInit(): void {
    this.getExpenceType();
  }

  getExpenceType() {
    this.apiCall.get('expencese/type', (data) => {
      this.exTypes = data;
      console.log(this.exTypes);
    });
  }

  someMethod(evnt) {
    if (evnt == 1) {
      this.isdoccharfe = true;
      this.loannum = undefined;
    } else {
      this.isdoccharfe = false;

      this.islist = false;
      this.isdocchargeamount = false;
      this.isdoccharfe = false;
    }
  }

  more(id) {
    this.mainid = id;
    this.apiCall.get('main/' + id, (data) => {
      this.dockCharge = data.dockCharge;
      this.cusid = data.customer.id;
      this.isdocchargeamount = true;
    });
  }

  search(num) {
    if (num) {
      this.apiCall.get('main/getByNumber/' + num, (data) => {
        this.doclist = data;
        console.log(this.doclist);
        this.dockCharge = undefined;
        this.isdocchargeamount = false;
        if (this.doclist.length > 0) {
          this.islist = true;
        } else {
          this.islist = true;
        }
      });
    }
  }

  apply() {
    console.log(this.selectedExType);
    console.log(this.description);
    console.log(this.date);
    console.log(this.to);
    console.log(this.amount);

    if (
      this.selectedExType &&
      this.selectedExType > 0 &&
      this.date &&
      this.amount > 0
    ) {
      const expences = {
        description: this.description,
        day: this.date,
        to: this.to,
        amount: this.amount,
        status: 1,
        exptype: this.selectedExType,
      };
      this.apiCall.post('expencese/save', { expences: expences }, (data) => {
        let obj = {
          transaction: {
            day: new Date(),
            capital: 0,
            interest: 0,
            warant: 0,
            arrears: 0,
            dockCharge: Number(this.amount) * Number(-1),
            monthCount: 0,
            nonRefund: 0,
            advance: 0,
            otherPay: 0,
            over: 0,
            total: 0,
            payType: '-',
            cheque: '-',
            loanType: '-',
            interestRate: 0,
            status: 3,
            customer: this.cusid,
            main: this.mainid,
            user: this.getuser.id,
          },
        };

        if (this.isdoccharfe) {
          this.apiCall.post('transaction/save', obj, (datas) => {
            console.log(datas);
          });
        }
      });
    } else {
      this.alart.showNotification('warning', 'Please recheck your input');
    }
  }
}
