import { Component, OnInit } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-expencese',
  templateUrl: './expencese.component.html',
  styleUrls: ['./expencese.component.scss']
})
export class ExpenceseComponent implements OnInit {

  exTypes;
  selectedExType;

  description;
  date;
  to;
  amount;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getExpenceType();
  }

  getExpenceType() {
    this.apiCall.get('expencese/type', data => {
      this.exTypes = data;
      console.log(this.exTypes);
    });
  }

  apply() {
    console.log(this.selectedExType);
    console.log(this.description)
    console.log(this.date)
    console.log(this.to)
    console.log(this.amount)

    if (this.selectedExType && this.selectedExType > 0 && this.date && this.amount > 0) {
      const expences = {
        description: this.description,
        day: this.date,
        to: this.to,
        amount: this.amount,
        status: 1,
        exptype: this.selectedExType
      }
      this.apiCall.post('expencese', { expences: expences }, data => {
        console.log(data);
      });
    } else {
      this.alart.showNotification('warning', 'Please recheck your input');
    }

  }

}
