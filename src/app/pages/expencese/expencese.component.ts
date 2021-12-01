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

}
