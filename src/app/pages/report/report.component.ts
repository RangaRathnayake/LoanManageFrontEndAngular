import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  from;
  to;
  reportPath = environment.reportPath;
  constructor() {}

  ngOnInit(): void {}

  alltrans() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'L',
      },
    };
    window.open(
      this.reportPath + 'all.html?data=' + JSON.stringify(range),
      '_blank'
    );
  }

  alltransLoan() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'L',
      },
    };
    window.open(
      this.reportPath + 'incomeLoan.html?data=' + JSON.stringify(range),
      '_blank'
    );
  }

  alltransprop() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'P',
      },
    };
    window.open(
      this.reportPath + 'incomeProp.html?data=' + JSON.stringify(range),
      '_blank'
    );
  }

  expenses() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };
    window.open(
      this.reportPath + 'expences.html?data=' + JSON.stringify(range),
      '_blank'
    );
  }
}
