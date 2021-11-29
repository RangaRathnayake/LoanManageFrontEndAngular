import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';

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
  date;
  address;
  doccharge;
  mobile;
  rate;
  ratelist;

  constructor(private apiCall: ApicallService, private alart: AlartService) { 
    this.gettate();
  }

  ngOnInit(): void {
  }

  apply(){

    if(this.loanamount && this.cusfullname && this.monthrate && this.namewithinitial && this.month 
      && this.nic && this.date && this.address && this.doccharge && this.mobile && this.rate && this.ratelist){

        this.apiCall.post('main', {
          main: {
            loanType: "l",
            oderNumber: "L1",
            loanAmount: "1000",
            dockCharge: "0.00",
            totalLoanAmount: "0.00",
            monthsCount: 12,
            interestRate: "10.00",
            interestRateId: 1,
            startDate: "2021-11-25",
            userId: 1,
            capitalPerMonth: "0.00",
            interestPerMonth: "0.00",
            totalPerMonth: "0.00",
            monthlyPayDate: "2021-11-30",
            NonRefundableAdvance: "0.00",
            downPayment: "0.00",
            projectId: null,
            projectName: null,
            blockNumber: null,
            propertyName: null,
            propertyCode: null,
            status: 0,
            customer: 1
          }
        }, data => {
          this.alart.showNotification('success', 'save');
        })

      }else{

      }

  }


  gettate(){
    this.apiCall.get('interest', result => {
      this.ratelist=result;
      console.log(result);

    })
  }


}
