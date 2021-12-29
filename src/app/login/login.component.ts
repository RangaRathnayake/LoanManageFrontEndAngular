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
        if (data) {
          console.log('-----------------');
          console.log(data);
          console.log(data.id);
          console.log('-----------------');
          this.alart.showNotification('success', 'Welcome to RMC System');
          localStorage.setItem('user', JSON.stringify(data));
          window.location.href = '/';
        } else {
          console.log("error logi");
          this.alart.showNotification('warning', 'Username or password is wrong');
        }

      })
    } else {

    }
  }

}
