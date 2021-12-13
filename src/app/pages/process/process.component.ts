import { Component, OnInit } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  keyVals;
  warrant_day;
  warrant_rate;
  isStart = false;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getKeyVal();
  }

  getKeyVal() {
    this.apiCall.get('keyval', data => {
      data.forEach(element => {
        if (element.key == "warrant_day") this.warrant_day = element.val;
        if (element.key == "warrant_rate") this.warrant_rate = element.val;

      });
    })
  }

  startProcess() {
    // this.isStart = true;
    console.log("start")
    this.apiCall.post('main/arrearsProcess', {}, data => {
      console.log(data);
    })
  }

}
