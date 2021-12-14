import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  rate;
  ratelist;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getrate();
  }

  apply(){
    if(this.rate){
      this.apiCall.post('interest', {
        interest:{
          rate: this.rate,
          status: 1
      }
      }, data => { 
        if(data){
          this.alart.showNotification('success', 'save');
          this.getrate();
        }

       })
    }else{
      this.alart.showNotification('warning', 'check all feilds');
    }
  }

  getrate(){
    this.apiCall.get('interest', result => {
      this.ratelist = result;
      console.log(result);

    })
  }

}
