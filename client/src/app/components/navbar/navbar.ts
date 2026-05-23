import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  router = inject(Router);
  authService = inject(Auth);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next: (val: boolean) => {
        this.isLoggedIn = val;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
