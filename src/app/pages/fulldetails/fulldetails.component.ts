import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-fulldetails',
  templateUrl: './fulldetails.component.html',
  styleUrls: ['./fulldetails.component.scss'],
})
export class FulldetailsComponent implements OnInit {
  loannumber;
  cusname;

  mobile;
  nic;
  adress;
  phone;

  totalLoanAmount;
  paid;
  current;
  anualRate;
  rateId;
  mainId;
  transactionData;
  mainData;
  user;
  clickOnApprove = false;

  totalHaveToPay: number = 0;
  capitalPerMonth: number = 0;
  interestPerMonth: number = 0;
  arrears: number = 0;
  warrant: number = 0;
  priviarsOver: number = 0;

  loanType;

  constructor(
    private router: Router,
    private arout: ActivatedRoute,
    private apiCall: ApicallService,
    private alart: AlartService
  ) {}

  ngOnInit(): void {
    this.user = this.apiCall.logedUser();
    console.log(this.user);

    this.arout.params.subscribe((params) => {
      const id = params['id'];
      this.mainId = id;
      if (id) {
        this.getmoreinfo(id);
        this.getTransactionData(id);
      } else {
      }
    });
  }

  getmoreinfo(id) {
    this.apiCall.get('main/' + id, (result) => {
      console.log('00000000000');
      console.log(result);
      console.log('00000000000');
      this.mainData = result;
      this.loannumber = result.oderNumber;
      this.cusname = result.customer.name;

      this.mobile = result.customer.mobile;
      this.nic = result.customer.nic;
      this.adress = result.customer.address;
      this.phone = result.customer.phone;

      this.loanType = result.loanType;

      this.rateId = result.interestRateId;
      this.totalLoanAmount = result.totalLoanAmount;
      this.capitalPerMonth = result.capitalPerMonth;
      this.interestPerMonth = result.interestPerMonth;
      if (this.mainData.status != 0) {
        this.clickOnApprove = true;
      }
      this.totalHaveToPay =
        parseFloat(this.capitalPerMonth + '') +
        parseFloat(this.interestPerMonth + '') +
        parseFloat(this.arrears + '') +
        parseFloat(this.warrant + ''); // over pay adu karanna one
      this.getAnualRate();
    });
  }

  getTransactionData(id) {
    this.apiCall.get('transaction/main/' + id, (result) => {
      if (result.length > 0) {
        this.transactionData = result;
      } else {
        console.log('empty');
        this.paid = 0.0;
        this.current = this.totalLoanAmount;
      }
      console.log(result);
    });
  }

  getAnualRate() {
    this.apiCall.get('interest/' + this.rateId, (data) => {
      this.anualRate = data.rate;
    });
  }

  more() {
    this.router.navigate(['moreinfo', this.mainId]);
  }

  dockCharge() {
    this.router.navigate(['dockCharge', this.mainId]);
  }

  settlement() {
    this.router.navigate(['settlement', this.mainId]);
  }

  approve() {
    this.clickOnApprove = true;
    this.mainData.status = 1;
    this.apiCall.post('main/save', { main: this.mainData }, (data) => {
      this.apiCall.post(
        'main/createArriarsList',
        { main: this.mainData },
        (dd) => {}
      );
      this.alart.showNotification('success', 'Loan Approved');
    });
  }

  edit() {
    this.router.navigate(['Update', this.mainId]);
  }

  printOnFile() {
    console.log('print On file');
    let obj = {
      oderNumber: this.mainData.oderNumber,
      name: this.mainData.customer.name,
      totalLoanAmount: this.mainData.totalLoanAmount,
      anualRate: this.anualRate,
      rental:
        Number(this.mainData.capitalPerMonth) +
        Number(this.mainData.interestPerMonth),
      date: this.mainData.startDate,
      monthsCount: this.mainData.monthsCount,
    };
    window.location.href =
      'https://rmcinvesment.com/0LoanPrint/onfile.html?data=' +
      JSON.stringify(obj);
  }

  Getadvance() {
    this.router.navigate(['proploan', this.mainId]);
  }

  histry() {
    this.router.navigate(['histry', this.mainId]);
  }
}
