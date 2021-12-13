import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-fulldetails',
  templateUrl: './fulldetails.component.html',
  styleUrls: ['./fulldetails.component.scss']
})
export class FulldetailsComponent implements OnInit {

  loannumber;
  cusname;
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


  constructor(private router: Router, private arout: ActivatedRoute, private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {

    this.user = this.apiCall.logedUser()
    console.log(this.user);

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
      this.mainData = result;
      this.loannumber = result.oderNumber;
      this.cusname = result.customer.name;
      this.rateId = result.interestRateId;
      this.totalLoanAmount = result.totalLoanAmount;
      this.capitalPerMonth = result.capitalPerMonth;
      this.interestPerMonth = result.interestPerMonth;
      if (this.mainData.status != 0) {
        this.clickOnApprove = true;
      }
      this.totalHaveToPay = parseFloat(this.capitalPerMonth + "") + parseFloat(this.interestPerMonth + "") + parseFloat(this.arrears + "") + parseFloat(this.warrant + ""); // over pay adu karanna one
      this.getAnualRate()
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

  getAnualRate() {
    this.apiCall.get('interest/' + this.rateId, data => {
      this.anualRate = data.rate;
    })
  }

  more() {
    this.router.navigate(['moreinfo', this.mainId]);
  }

  approve() {
    this.clickOnApprove = true;
    this.mainData.status = 1;
    this.apiCall.post('main', { main: this.mainData }, data => {
      this.apiCall.post('main/createArriarsList', { main: this.mainData }, dd => {
      })
      this.alart.showNotification("success", "Loan Approved");
    });
  }

}
