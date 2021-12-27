import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  from; to;
  constructor() { }

  ngOnInit(): void {
  }

  alltrans(){

    var range = {
      range: {
        from: this.from,
        to: this.to
      }
    }


    window.open("http://localhost/0LoanPrint/income.html?data=" + JSON.stringify(range), '_blank');
    
  }

}
