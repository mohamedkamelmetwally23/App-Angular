import { Routes } from '@angular/router';
import { AboutUs } from './components/about-us/about-us';
import { ContactUs } from './components/contact-us/contact-us';
import { CourseDetails } from './components/course-details/course-details';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { Order } from './components/order/order';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { NewCourse } from './components/new-course/new-course';
import { EditCourse } from './components/edit-course/edit-course';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'order', component: Order, canActivate: [authGuard] },
  { path: 'course/new', component: NewCourse, canActivate: [authGuard] },
  { path: 'course/:id/edit', component: EditCourse, canActivate: [authGuard] },
  { path: 'course/:id', component: CourseDetails, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: '**', component: NotFound },
];
