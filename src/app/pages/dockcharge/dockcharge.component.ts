import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-dockcharge',
  templateUrl: './dockcharge.component.html',
  styleUrls: ['./dockcharge.component.scss'],
})
export class DockchargeComponent implements OnInit {
  today;
  user;
  mainId;
  mainData;
  loannumber;
  cusname;
  rateId;
  totalLoanAmount;
  mainMonthCount;
  payType;
  cheaueNumber;
  anualRate;
  charge;
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
    });
  }

  pay() {
    if (this.payType) {
      if (this.charge > 0) {
        let obj = {
          transaction: {
            day: new Date(),
            capital: 0,
            interest: 0,
            warant: 0,
            arrears: 0,
            dockCharge: this.charge,
            monthCount: 0,
            nonRefund: 0,
            advance: 0,
            otherPay: 0,
            over: 0,
            total: this.charge,
            payType: this.payType,
            cheque: this.cheaueNumber,
            loanType: this.mainData.loanType,
            interestRate: this.mainData.interestRate,
            status: 1,
            customer: this.mainData.customer.id,
            main: this.mainData.id,
            user: this.user.id,
          },
        };
        var day = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        this.apiCall.post('main/saveTransaction', obj, (data) => {
          console.log(data);

          window.location.href =
            this.reportPath + 'index.html?data=' + JSON.stringify(data);
        });
      } else {
        this.alart.showNotification('danger', 'Please Enter Valid Amount');
      }
    } else {
      this.alart.showNotification('danger', 'Please Enter Pay Type');
    }
  }
}
