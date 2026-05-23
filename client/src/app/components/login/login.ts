import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(Auth);
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  constructor() {
    this.authService.isLoggedIn().subscribe({
      next: (val: boolean) => {
        if (val) {
          this.router.navigateByUrl('/');
        }
      },
    });
  }

  login() {
    if (!this.email.nativeElement.value || !this.password.nativeElement.value) return;

    this.authService.login(this.email.nativeElement.value, this.password.nativeElement.value);

    this.email.nativeElement.value = '';
    this.password.nativeElement.value = '';

    const url = this.route.snapshot.queryParams['returnUrl'];

    if (url) {
      this.router.navigateByUrl(url);
      return;
    }

    this.router.navigateByUrl('/');
  }
}
