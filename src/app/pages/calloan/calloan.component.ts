import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';

@Component({
  selector: 'app-calloan',
  templateUrl: './calloan.component.html',
  styleUrls: ['./calloan.component.scss']
})
export class CalloanComponent implements OnInit {
  loanamount;
  rate;
  ratelist;
  month;

  Capital;
  Interest;
  Total
  FullTotal;

  ischeck:boolean=false;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.gettate();
  }

  gettate(){
    this.apiCall.get('interest', result => {
      this.ratelist=result;
      console.log(result);

    })
  }


  cal(){
      this.Capital=(this.loanamount /this.month).toFixed(2);
      this.Interest = (this.Capital*(this.rate/100)).toFixed(2);
      this.Total=Number(this.Capital) + Number(this.Interest) ;
      this.FullTotal= Number(this.Total)*12;
      this.ischeck=true;
    
    
  }

}
