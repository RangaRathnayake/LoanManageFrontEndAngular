import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  TOKEN_KEY = environment.TOKEN_KEY;

  apiurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  post(url, param, fun) { this.http.post(this.apiurl + url, param).subscribe(result => fun(result), error => { fun(error) }); }

  get(url, fun) { this.http.get(this.apiurl + url).subscribe(result => fun(result), error => fun(error)); }

  logedUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) { return user }
    return null;
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.pathname = '/';
  }

  setLang(lang) {
    localStorage.setItem('lang', lang);
  }

  getLang() {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang');
    } else {
      return 'false';
    }
  }


}
