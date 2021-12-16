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
  monthrate;
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
    this.apiCall.get('interest/get', result => {
      this.ratelist=result;
      console.log(result);

    })
  }


  cal(){
    if(this.loanamount && this.rate  && this.month){
      this.Capital=(this.loanamount /this.month).toFixed(2);
      this.Interest = (this.loanamount *(this.rate/1200)).toFixed(2);
      this.Total=(Number(this.Capital) + Number(this.Interest)) .toFixed(2);
      this.FullTotal= (Number(this.Total)*this.month).toFixed(2);
      this.monthrate=Number(this.rate/12).toFixed(2);
      this.ischeck=true;

      console.log("xxxxxxxxxxx");
      console.log("rate",this.rate);
      console.log("month",this.month);
      console.log("xxxxxxxxxxx");
    }else{
      console.log("fklglkfdgkgg");
    }
    
  }

}
