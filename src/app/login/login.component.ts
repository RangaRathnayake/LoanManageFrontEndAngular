import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import { AlartService } from 'app/service/alart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uname; pword;
  TOKEN_KEY = 'secret';
  user;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.uname && this.pword) {
      this.apiCall.post('user/login', {
        email: this.uname,
        password: this.pword
      }, data => {
        console.log(data);
        this.alart.showNotification('Success', 'success');
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/';
      })
    } else {

    }
  }
  
}
