import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICourseModel } from '../../models/icourse.model';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { CoursesService } from './../../services/courses';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-courses',
  imports: [NgClass, FormsModule, NgStyle, DiscountPipe, CurrencyPipe, RouterLink],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class Courses {
  sentCategoryId = input<string>('0');

  discountPipe = inject(DiscountPipe);
  discountRate: number = 10;

  courses!: ICourseModel[];
  filteredCourses = signal<ICourseModel[]>([]);

  loading = signal<boolean>(false);
  loadingEnrollment = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private coursesService: CoursesService,
    private toastService: ToastService,
  ) {
    effect(() => {
      const catId = this.sentCategoryId();
      this.loading.set(true);
      this.error.set(null);

      this.coursesService.getCoursesByCatID(catId).subscribe({
        next: (res) => {
          this.courses = res.data;
          this.filteredCourses.set(res.data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message);
        },
      });
    });
  }

  enroll(course: ICourseModel) {
    if (course.seats <= 0) return;

    this.loadingEnrollment.set(true);

    const updatedSeats = course.seats - 1;

    this.coursesService.updateCourseSeats(course.id, updatedSeats).subscribe({
      next: () => {
        course.seats = updatedSeats;
        this.coursesService.totalOrderPrice.update(
          (prev) => prev + this.discountPipe.transform(course.price, this.discountRate),
        );

        this.loadingEnrollment.set(false);
        this.toastService.success('Course enrolled successfully');
      },
      error: (err) => {
        this.toastService.error('Something went wrong');
        this.loadingEnrollment.set(false);
      },
    });
  }
}
