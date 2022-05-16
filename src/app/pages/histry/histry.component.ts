import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-histry',
  templateUrl: './histry.component.html',
  styleUrls: ['./histry.component.scss'],
})
export class HistryComponent implements OnInit {
  mainId;
  transactionData;

  constructor(
    private router: Router,
    private arout: ActivatedRoute,
    private apiCall: ApicallService,
    private alart: AlartService
  ) {}

  ngOnInit(): void {
    this.arout.params.subscribe((params) => {
      const id = params['id'];
      this.mainId = id;
      if (id) {
        this.getTransactionData(id);
      } else {
      }
    });
  }

  getTransactionData(id) {
    this.apiCall.get('transaction/main/' + id, (result) => {
      if (result.length > 0) {
        this.transactionData = result;
        console.log(this.transactionData);
      } else {
        console.log('empty');
      }
    });
  }

  more(id) {
    this.apiCall.get('main/getTransaction/' + id, (result) => {
      window.location.href =
        'https://rmcinvesment.com/0LoanPrint/index.html?data=' +
        JSON.stringify(result);
    });
  }
}
