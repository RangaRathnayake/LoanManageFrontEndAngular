import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.scss']
})
export class MoreinfoComponent implements OnInit {

  loannumber;
  cusname;
  totalLoanAmount;
  paid;
  current;
  anualRate;
  rateId;
  mainId;
  transactionData;

  totalHaveToPay: number = 0;
  capitalPerMonth: number = 0;
  interestPerMonth: number = 0;
  arrears: number = 10.00;
  warrant: number = 10.00;
  priviarsOver: number = 0;

  inputval;
  payW = 0;
  payA = 0;
  payC = 0;
  payI = 0;
  payT = 0;
  over = 0;

  clickOnPay = false;

  constructor(private router: Router, private arout: ActivatedRoute, private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
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
    this.apiCall.get('main/' + id, result => {
      console.log(result);
      this.loannumber = result.oderNumber;
      this.cusname = result.customer.name;
      this.rateId = result.interestRateId;
      this.totalLoanAmount = result.totalLoanAmount;
      this.capitalPerMonth = result.capitalPerMonth;
      this.interestPerMonth = result.interestPerMonth;
      this.totalHaveToPay = parseFloat(this.capitalPerMonth + "") + parseFloat(this.interestPerMonth + "") + parseFloat(this.arrears + "") + parseFloat(this.warrant + ""); // over pay adu karanna one
      this.getAnualRate()
    })
  }

  getAnualRate() {
    this.apiCall.get('interest/' + this.rateId, data => {
      this.anualRate = data.rate;
    })
  }

  getTransactionData(id) {
    this.apiCall.get('transaction/main/' + id, result => {
      if (result.length > 0) {
        this.transactionData = result;
      } else {
        console.log("empty");
        this.paid = 0.00;
        this.current = this.totalLoanAmount;
      }
      console.log(result)
    })
  }


  cal(value) {
    console.log(value);
    this.payT = value;
    this.payW = 0;
    this.payA = 0;
    this.payC = 0;
    this.payI = 0;
    this.over = 0;

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
        if (this.capitalPerMonth <= this.over) {
          this.payC = this.capitalPerMonth;
          this.over = this.over - this.capitalPerMonth;
        } else {
          this.payC = this.over;
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

    }
    console.log(this.over);
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
    } else {
      this.alart.showNotification("danger", "Please Enter Pay Amount Correctly")
    }

  }

}
