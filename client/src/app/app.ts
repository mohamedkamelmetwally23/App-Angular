import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet, AngularToastifyModule],
  templateUrl: './app.html',
  providers: [ToastService],
  styleUrl: './app.css',
})
export class App {}
