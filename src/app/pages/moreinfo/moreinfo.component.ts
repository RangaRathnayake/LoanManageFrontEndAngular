import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.scss']
})
export class MoreinfoComponent implements OnInit {

  loannumber;
  cusname;

  constructor(private router: Router, private arout: ActivatedRoute ,private apiCall: ApicallService) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getmoreinfo(id);
       } else {

      }
    });
  }

  getmoreinfo(id){
    this.apiCall.get('main/'+id, result => {
      this.loannumber=result.oderNumber;
      this.cusname=result.customer.name;
      
    })
  }

  applyFilter(event: Event){

  }

}
