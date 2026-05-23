import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loginStatus.next(!!localStorage.getItem('token'));
  }

  login(email: string, password: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', 'asmldkasmfoasmfas54asf8as7as1ascas.asdasdasccasfasmf465as2f');
    this.loginStatus.next(true);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loginStatus;
  }
}
