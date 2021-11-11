import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uname; pword;
  TOKEN_KEY = 'secret';
  user;

  constructor() { }

  ngOnInit(): void {
  }

  login() { }
}
