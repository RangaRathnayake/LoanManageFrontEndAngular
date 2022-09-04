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
  constructor() { }

  ngOnInit(): void { }

  alltrans() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'L',
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'all.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'all.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  satled() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'L',
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'satled.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'satled.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }


  satledProperty() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'P',
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'satledProperty.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'satledProperty.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }




  alltransLoan() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'L',
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'incomeLoan.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'incomeLoan.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  alltransprop() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: 'P',
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'incomeProp.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'incomeProp.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  expenses() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'expences.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'expences.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  arrearsReport() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'arrearsReport.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'arrearsReport.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  arrearsReportProp() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'arrearsReportProp.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'arrearsReportProp.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  creditMain() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };
    window.open(this.reportPath + 'main.html', '_blank');
  }

  newloandetails() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'newloandetails.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'newloandetails.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  newpropdetails() {
    var range = {
      range: {
        from: this.from,
        to: this.to,
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'newpropdetails.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'newpropdetails.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }

  incomeexpenceLoan() {
    console.log('hit');
    var type = { type: 'L' };
    window.open(
      this.reportPath + 'incomeexpence.html?data=' + JSON.stringify(type),
      '_blank'
    );
  }

  incomeexpenceProp() {
    console.log('hit');
    var type = { type: 'P' };
    window.open(
      this.reportPath + 'incomeexpence.html?data=' + JSON.stringify(type),
      '_blank'
    );
  }

  incomeexpenceProperty() {
    window.open(this.reportPath + 'incomeexpence.html?data=P', '_blank');
  }

  monthlyTransactionReport(type) {

    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: type
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      window.open(
        this.reportPath + 'monthlyCredit.html?data=' + JSON.stringify(range),
        '_blank'
      );
    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      window.open(
        this.reportPath + 'monthlyCredit.html?data=' + JSON.stringify(range),
        '_blank'
      );
    }
  }


  monthlyTransactionReportManually(type) {

    var range = {
      range: {
        from: this.from,
        to: this.to,
        type: type
      },
    };

    if (range.range.from != null && range.range.to != null) {
      console.log('range Ok');
      if (range.range.type == 'L') {
        window.open(
          this.reportPath + 'monthlyCreditManually.html?data=' + JSON.stringify(range),
          '_blank'
        );
      } else {
        window.open(
          this.reportPath + 'monthlyPropertyManually.html?data=' + JSON.stringify(range),
          '_blank'
        );
      }

    } else {
      range.range.from = '2021-01-01';
      range.range.to = '2035-01-01';
      if (range.range.type == 'L') {
        window.open(
          this.reportPath + 'monthlyCreditManually.html?data=' + JSON.stringify(range),
          '_blank'
        );
      } else {
        window.open(
          this.reportPath + 'monthlyPropertyManually.html?data=' + JSON.stringify(range),
          '_blank'
        );
      }
    }
  }



}
