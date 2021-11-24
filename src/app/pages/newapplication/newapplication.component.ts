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

  }
  gettate(){
    this.apiCall.get('interest', result => {
      this.ratelist=result;
      console.log(result);

    })
  }


}
